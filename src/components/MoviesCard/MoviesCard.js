import React from "react";
import "./MoviesCard.css";

import { useLocation } from "react-router-dom";

function MoviesCard({ card, onSaveMovie, onDeleteMovie, saveCardId }) {
  let location = useLocation();

  const [saveCard, setSaveCard] = React.useState(false);

  React.useEffect(() => {
    saveCardId.map((saveMovies) => {
      if (saveMovies.movieId === card.id) {
        setSaveCard(true);
      }
    });
  }, []);

  //Обработчик клика по кнопке лайка
  function handleLikeClick() {
    if (saveCard) {
      //console.log(saveCardId.filter((item) => item.movieId === card.id)[0]);
      onDeleteMovie(saveCardId.filter((item) => item.movieId === card.id)[0]);
      setSaveCard(false);
      console.log(false);
    } else {
      onSaveMovie(card);
      setSaveCard(true);
      //console.log(true);
    }
  }

  //Обработчик клика по кнопке удаления/карточки
  function handleDeleteClick() {
    onDeleteMovie(card);
  }

  return (
    <li className="movie">
      <div className="movie__button"></div>
      {location.pathname === "/movies" ? (
        <button
          className={saveCard ? "movie__save-active active" : "movie__save"}
          type="button"
          onClick={handleLikeClick}
        >
          Сохранить
        </button>
      ) : (
        <button
          className="movie__delete"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <a className="movie__link" href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movie__image"
          src={
            location.pathname === "/saved-movies"
              ? card.image
              : `https://api.nomoreparties.co${card.image.url}`
          }
          alt={card.nameRU}
        />
      </a>
      <div className="movie__container">
        <h2 className="movie__name">{card.nameRU}</h2>
        <p className="movie__duration">{card.duration}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
