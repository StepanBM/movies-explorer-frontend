import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

import { useLocation } from "react-router-dom";

function MoviesCardList({ cards }) {
  let location = useLocation();
  return (
    <section className="list-movies">
      <ul className="list-movies__container">
        {cards.map((item) => (
          <MoviesCard key={item._id} card={item} />
        ))}
      </ul>
      {location.pathname === "/movies" ? (
        <button className="list-movies__more" type="button">
          Ещё
        </button>
      ) : (
        ""
      )}
    </section>
  );
}

export default MoviesCardList;
