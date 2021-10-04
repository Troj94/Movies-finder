import { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Notify } from 'notiflix';

import { fetchMoviesByQuery } from 'services/fetchMovies';
import { MovieCard } from 'components/MovieCard/MovieCard';
import { Spinner } from 'components/Loader/Loader';

import css from 'components/views/SearchMoviesPage/SearchMoviesPage.module.css';
import link from 'components/MovieCard/MovieCard.module.css';

export default function SearchMoviesPage() {
  const [searchFilms, setSearchFilms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loaderIsActive, setLoaderIsActive] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const { url } = useRouteMatch();

  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  const sort = new URLSearchParams(location.search).get('query');

  const handleSubmitFilm = event => {
    event.preventDefault();
    setLoaderIsActive(true);
    if (!searchQuery) {
      Notify.warning('Input field is empty');
      return;
    }
    history.push({
      ...location,
      search: `query=${searchQuery}`,
    });
  };

  useEffect(() => {
    if (!location.search) {
      return;
    }

    fetchMoviesByQuery(sort)
      .then(response => {
        setSearchFilms(response.results);
        if (response.results.length === 0) {
          Notify.warning('No movies find');
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoaderIsActive(false));
    setSearchQuery('');
  }, [location.search, sort]);

  return (
    <>
      <div className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmitFilm}>
          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search films"
            value={searchQuery}
            onChange={handleChange}
          />
          <button className={css.inputButton} type="submit">
            Find
          </button>
        </form>
      </div>
      {loaderIsActive && <Spinner />}
      <ul className={css.list}>
        {searchFilms.map(movie => {
          return (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: { from: `${url}${history.location.search}` },
                }}
                className={link.link}
              >
                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  title={movie.title}
                  preview={movie.poster_path}
                  rating={movie.vote_average}
                  overview={movie.overview}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
