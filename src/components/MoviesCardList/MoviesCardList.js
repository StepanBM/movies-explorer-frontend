import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards }) {
  return (
    <section className="list-movies">
      <ul className="list-movies__container">
        {cards.map((item) => (
          <MoviesCard key={item._id} card={item} />
        ))}
      </ul>
      <button className="list-movies__more" type="button">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
