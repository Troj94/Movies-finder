import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchActorsById } from 'services/fetchMovies';
import { Spinner } from 'components/Loader/Loader';
import emptyImage from 'images/no-image.png';

import css from 'components/views/Cast.module.css';

export default function Cast({ movieId }) {
  const [actors, setActors] = useState([]);
  const [loaderIsActive, setLoaderIsActive] = useState(false);

  useEffect(() => {
    setLoaderIsActive(true);
    fetchActorsById(movieId)
      .then(actors => setActors(actors.cast))
      .catch(error => console.log(error))
      .finally(() => setLoaderIsActive(false));
  }, [movieId]);

  const checkPhoto = actor => {
    if (actor.profile_path) {
      return `https://image.tmdb.org/t/p/w500/${actor.profile_path}`;
    } else {
      return emptyImage;
    }
  };

  return (
    <ul className={css.list}>
      <div className={css.spinner}> {loaderIsActive && <Spinner />}</div>
      {actors.map(actor => (
        <li className={css.item} key={actor.id}>
          <img
            className={css.image}
            src={checkPhoto(actor)}
            alt={actor.name}
            width="200"
          />
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};
