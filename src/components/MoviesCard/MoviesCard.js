import React from "react";
import "./MoviesCard.css";

import { useLocation } from "react-router-dom";

function MoviesCard({ card, onSaveMovie, onDeleteMovie, save }) {
  let location = useLocation();

  const [saveCard, setSaveCard] = React.useState(false);

  React.useEffect(() => {
    if (location.pathname === "/movies")
      save.map((saveMovies) => {
        if (saveMovies.movieId === card.id) {
          setSaveCard(true);
        }
      });
  }, [save, card, location.pathname]);

  /*function onClickSaveCard() {
    setSaveCard(!saveCard);
  }*/

  //обработчик клика по кнопке лайка
  function handleLikeClick() {
    if (saveCard) {
      onDeleteMovie(save.filter((item) => item.movieId === card.id)[0]);
    } else {
      onSaveMovie(card);
    }
  }

  //обработчик клика по кнопке удаления/дизлайка
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
