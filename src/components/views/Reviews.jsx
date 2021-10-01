import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchReviewsById } from 'services/fetchMovies';
import { Spinner } from 'components/Loader/Loader';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [loaderIsActive, setLoaderIsActive] = useState(false);

  useEffect(() => {
    setLoaderIsActive(true);
    fetchReviewsById(movieId)
      .then(reviews => setReviews(reviews.results))
      .catch(error => console.log(error))
      .finally(() => setLoaderIsActive(false));
  }, [movieId]);

  return (
    <>
      {loaderIsActive && <Spinner />}
      {reviews.length === 0 ? (
        <p>No rewiews yet</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li style={{ listStyle: 'none' }} key={review.id}>
              <h5>{review.author}</h5>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};
