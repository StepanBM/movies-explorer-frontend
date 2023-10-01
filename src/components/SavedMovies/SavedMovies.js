import React, { useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ saveCard, onDeleteMovie }) {
  const [filterSaveFilms, setFilterSaveFilms] = React.useState([]);
  const [isShortSaveFilms, setIsShortSaveFilms] = React.useState(
    localStorage.getItem("checkbox") === "true" ? true : false
  );

  useEffect(() => {
    if (isShortSaveFilms) {
      setFilterSaveFilms(saveCard.filter((film) => film.duration <= 40));
    } else {
      setFilterSaveFilms(saveCard);
    }

    console.log("effectFilter");
  }, [saveCard]);

  //Поиск фильмов в Movies
  function handleSearchFilms(v) {
    const newCards = filterSaveFilms.filter((card) => {
      return (
        card.nameRU.toLowerCase().includes(v.toLowerCase()) ||
        card.nameEN.toLowerCase().includes(v.toLowerCase())
      );
    });

    setFilterSaveFilms(newCards);
  }

  // Фильтр короткометражек
  function handleShortSaveFilms(v) {
    setIsShortSaveFilms(v);
    if (!isShortSaveFilms) {
      setFilterSaveFilms(saveCard.filter((film) => film.duration <= 40));
      localStorage.setItem(
        "filteredsave",
        JSON.stringify(saveCard.filter((film) => film.duration <= 40))
      );
    } else {
      setFilterSaveFilms(saveCard);
    }
  }

  return (
    <section className="saved-movies">
      <SearchForm
        setSearchQuery={handleSearchFilms}
        isShortFilms={isShortSaveFilms}
        setIsShortFilms={handleShortSaveFilms}
      />
      <MoviesCardList
        films={filterSaveFilms}
        onDeleteMovie={onDeleteMovie}
        saveCard={saveCard}
      />
    </section>
  );
}

export default SavedMovies;
