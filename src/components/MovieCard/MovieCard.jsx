import { useState, useEffect } from 'react';
import css from 'components/MovieCard/MovieCard.module.css';

export function MovieCard({ title, preview, rating, overview }) {
  const [modalOpen, setModalOpen] = useState(false);
  // console.log(preview);

  // const openMovie = () => {
  //   return <div>Movie</div>;
  // };

  // useEffect(() => {
  //   setInfoOpen(true);

  //   movieInfo();
  // }, []);

  const movieInfo = () => {
    setModalOpen(true);
    console.log(title, rating, overview);
  };

  const modalClose = () => {
    setModalOpen(false);
  };

  if (!modalOpen) {
    return (
      <li className={css.cardItem} onClick={movieInfo}>
        <div className={css.cardItemName}> {title}</div>

        <img
          className={css.cardImage}
          src={`https://image.tmdb.org/t/p/w500/${preview}`}
          alt="imge"
        />
      </li>
    );
  } else {
    return (
      <div className={css.cardItemInfo} onClick={modalClose}>
        <p>{title}</p>
        <p>{rating}</p>
        <p>{overview}</p>
        <p>Cast</p>
        <p>Reviews</p>
      </div>
    );
  }

  // return (
  //   <li className={css.cardItem} onClick={movieInfo}>
  //     {title}

  //     <img
  //       className={css.cardImage}
  //       src={`https://image.tmdb.org/t/p/original/${preview}`}
  //       alt="imge"
  //     />
  //   </li>
  // );
}
