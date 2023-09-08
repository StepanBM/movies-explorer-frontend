import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards }) {
  return (
    <section className="movies">
      <div className="movies__container">
        {cards.map((item) => (
          <MoviesCard key={item._id} card={item} />
        ))}
      </div>
      <button className="movies__more" type="button">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
