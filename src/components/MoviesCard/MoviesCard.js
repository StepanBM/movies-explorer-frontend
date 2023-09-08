import React from "react";
import "./MoviesCard.css";

import { useLocation } from "react-router-dom";

function MoviesCard({ card }) {
  const [saveCard, setSaveCard] = React.useState(false);

  function onClickSaveCard() {
    setSaveCard(!saveCard);
  }

  let location = useLocation();

  return (
    <article className="movie">
      <div className="movie__button"></div>
      {location.pathname === "/movies" ? (
        <button
          className={saveCard ? "movie__save-active active" : "movie__save"}
          onClick={onClickSaveCard}
        >
          Сохранить
        </button>
      ) : (
        <button className="movie__delete"></button>
      )}
      <img className="movie__image" src={card.link} alt="Фильм" />
      <div className="movie__container">
        <h2 className="movie__name">{card.name}</h2>
        <p className="movie__duration">{card.duration}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
