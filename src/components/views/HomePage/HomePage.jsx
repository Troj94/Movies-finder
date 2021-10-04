import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Notify } from 'notiflix';

import { fetchMovies } from 'services/fetchMovies';
import { MovieCard } from 'components/MovieCard/MovieCard';
import { Spinner } from 'components/Loader/Loader';

import css from 'components/views/HomePage/HomePage.module.css';
import link from 'components/MovieCard/MovieCard.module.css';

export default function HomePage() {
  const [moviesList, setMovies] = useState([]);
  const [loaderIsActive, setLoaderIsActive] = useState(false);

  useEffect(() => {
    setLoaderIsActive(true);
    fetchMovies()
      .then(response => {
        setMovies(response.results);
      })
      .catch(error => Notify.failure('Something wrong!'))
      .finally(() => setLoaderIsActive(false));
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      {loaderIsActive && <Spinner />}

      <ul className={css.list}>
        {moviesList.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} className={link.link}>
                <MovieCard
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
