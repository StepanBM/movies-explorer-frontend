import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ saveCard, onDeleteMovie }) {
  const [valueParams, setValueParams] = React.useState("");

  const filterSaveFilms = saveCard.filter((film) => {
    return (
      film.nameRU.toLowerCase().includes(valueParams.toLowerCase()) ||
      film.nameEN.toLowerCase().includes(valueParams.toLowerCase())
    );
  });
  return (
    <section className="saved-movies">
      <SearchForm params={setValueParams} />
      <MoviesCardList films={filterSaveFilms} onDeleteMovie={onDeleteMovie} />
    </section>
  );
}

export default SavedMovies;
