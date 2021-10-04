import { useEffect, useState } from 'react';
import { lazy, Suspense } from 'react';
import {
  Route,
  Switch,
  useParams,
  useHistory,
  useLocation,
} from 'react-router';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { getYear, parseISO } from 'date-fns';

import { fetchMovieById } from 'services/fetchMovies';
import { Spinner } from 'components/Loader/Loader';
import emptyImage from 'images/no-image.png';

import css from 'components/views/DetailsPage/DetailsPage.module.css';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function DetailsPage() {
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [goBack, setGoBack] = useState('');
  const [loaderIsActive, setLoaderIsActive] = useState(false);
  const history = useHistory();
  const location = useLocation();
  let { movieId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    setLoaderIsActive(true);
    if (location.state) {
      setGoBack(location.state.from);
    }

    fetchMovieById(movieId)
      .then(data => {
        setMovie(data);
        setGenres(data.genres);
      })
      .catch(error => console.log(error))
      .finally(() => setLoaderIsActive(false));
  }, [location.state, movieId]);

  const handleGoBack = () => {
    history.push(location.state?.from ? location.state.from : '/');
  };

  const checkPoster = () => {
    if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    } else {
      return emptyImage;
    }
  };

  return (
    <div>
      {loaderIsActive && <Spinner />}
      {movie && (
        <>
          <span className={css.button} onClick={handleGoBack}>
            Return
          </span>

          <div>
            <h1>
              {movie.title}
              {movie.release_date &&
                `(${getYear(parseISO(movie.release_date))})`}
            </h1>
            <img className={css.image} src={checkPoster()} alt={movie.title} />

            <h2>Rating: {movie.vote_average}</h2>

            <h3>Genres</h3>
            {genres.map(genre => {
              return (
                <li className={css.genre} key={genre.id}>
                  {genre.name}
                </li>
              );
            })}

            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
          <div>
            <h3>Additional information</h3>
            <div className={css.infoBlock}>
              <NavLink
                className={css.button}
                activeClassName={css.activeButton}
                to={{
                  pathname: `${url}/cast`,
                  state: { from: `${goBack}` },
                }}
              >
                Cast
              </NavLink>

              <NavLink
                className={css.button}
                activeClassName={css.activeButton}
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: `${goBack}` },
                }}
              >
                Reviews
              </NavLink>
            </div>

            <div>
              <Suspense fallback={<Spinner />}>
                <Switch>
                  <Route path={`${url}/cast`}>
                    <Cast movieId={movieId}></Cast>
                  </Route>
                  <Route path={`${url}/reviews`}>
                    <Reviews movieId={movieId}></Reviews>
                  </Route>
                </Switch>
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
