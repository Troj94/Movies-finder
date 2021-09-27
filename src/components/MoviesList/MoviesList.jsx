import { useEffect, useState } from 'react';
import { getMovies } from 'services/fetchMovies';
import { Notify } from 'notiflix';

import { MovieCard } from 'components/MovieCard/MovieCard';
import { Spinner } from 'components/Loader/Loader';
import css from 'components/MoviesList/MoviesList.module.css';

export function MoviesList() {
  const [moviesList, setMoviesList] = useState([]);
  const [loaderIsActive, setLoaderIsActive] = useState(false);

  useEffect(() => {
    getMovies()
      .then(response => setMoviesList(response.results))
      .catch(error => Notify.failure('Something wrong!'))
      .finally(() => setLoaderIsActive(false));
  }, []);

  return (
    <ul className={css.moviesList}>
      {loaderIsActive && <Spinner />}
      {moviesList.map(movie => {
        return (
          <MovieCard
            key={movie.id}
            title={movie.title}
            preview={movie.poster_path}
            rating={movie.vote_average}
            overview={movie.overview}
          />
        );
      })}
      {/* <button>LoadMovies</button> */}
    </ul>
  );
}
