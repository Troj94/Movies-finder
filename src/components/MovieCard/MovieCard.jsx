import PropTypes from 'prop-types';
import emptyImage from 'images/no-image.png';

import css from 'components/MovieCard/MovieCard.module.css';

export function MovieCard({ title, preview }) {
  return (
    <div className={css.cardItem}>
      <div className={css.cardItemName}>{title}</div>
      {preview ? (
        <img
          className={css.cardImage}
          src={`https://image.tmdb.org/t/p/w500/${preview}`}
          alt={`${title}`}
        />
      ) : (
        <img className={css.cardImage} src={emptyImage} alt={`${title}`} />
      )}
    </div>
  );
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  preview: PropTypes.string,
};
