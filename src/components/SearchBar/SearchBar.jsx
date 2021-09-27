import { useState, useEffect } from 'react';
import css from 'components/SearchBar/SearchBar.module.css';
import { Notify } from 'notiflix';
import csss from 'components/MoviesList/MoviesList.module.css';

import { MovieCard } from 'components/MovieCard/MovieCard';
import { getSearchMovies } from 'services/fetchMovies';
import { Spinner } from 'components/Loader/Loader';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMoviesList, setSearchMoviesList] = useState([]);
  const [loaderIsActive, setLoaderIsActive] = useState(false);

  const searchMovie = event => {
    event.preventDefault();

    setSearchQuery(searchQuery);
    setSearchQuery('');
    getSearchMovie(searchQuery);
  };

  const getSearchMovie = searchQuery => {
    if (!searchQuery) {
      return Notify.warning('Search field is empty');
    }

    getSearchMovies(searchQuery)
      .then(response => {
        setSearchMoviesList(response.results);
        if (response.results.length === 0) {
          Notify.warning('None movies find');
        }
      })
      .catch(() => Notify.failure('Something wrong!'))
      .finally(() => setLoaderIsActive(false));
  };

  const handleSearchQueryChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className={css.Searchbar}>
        <form action="" className={css.SearchForm} onSubmit={searchMovie}>
          <input
            className={css.SearchFormInput}
            type="text"
            placeholder="Search movies"
            autoComplete="off"
            autoFocus
            onChange={handleSearchQueryChange}
            onSubmit={searchMovie}
            value={searchQuery}
            name="query"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <ul className={csss.moviesList}>
        {loaderIsActive && <Spinner />}
        {}
        {searchMoviesList.map(movie => {
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
      </ul>
    </div>
  );
}
