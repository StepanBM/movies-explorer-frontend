import React, { useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { MOVIES_SHORT } from "../../utils/constants";

function Movies({ onSaveMovie, onDeleteMovie, saveCard, isLoading, initialCards }) {
  const [filterFilms, setFilterFilms] = React.useState(
    JSON.parse(localStorage.getItem("filteredFilms")) || []
  );
  const [shortFilms, setShortFilms] = React.useState(
    JSON.parse(localStorage.getItem("shortFilms")) || []
  );

  const [isShortFilms, setIsShortFilms] = React.useState(
    localStorage.getItem("checkbox") === "true" ? true : false
  );
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");

  useEffect(() => {
    setFilterFilms(JSON.parse(localStorage.getItem("filteredFilms")));
  }, []);

  function handleShortFilms(v) {
    if (filterFilms) {
      setIsShortFilms(v);
      if (!isShortFilms) {
        setShortFilms(filterFilms.filter((film) => film.duration <= MOVIES_SHORT));
        localStorage.setItem(
          "shortFilms",
          JSON.stringify(filterFilms.filter((film) => film.duration <= MOVIES_SHORT))
        );
      } else {
        setFilterFilms(filterFilms);
      }
    }
  }

  function handleSearchFilms(v) {
    const inputValueFilms = v.toLowerCase();
    const newCards = initialCards.filter((card) => {
      return (
        card.nameRU.toLowerCase().includes(inputValueFilms) ||
        card.nameEN.toLowerCase().includes(inputValueFilms)
      );
    });

    if (newCards.length === 0) {
      setError(true);
      setErrorText("Ничего не найдено");
    } else if (inputValueFilms.length === 0) {
      setError(true);
      setErrorText("Нужно ввести ключевое слово");
    } else {
      setError(false);
    }
    setFilterFilms(newCards);
    localStorage.setItem("filteredFilms", JSON.stringify(newCards));
  }

  return (
    <section className="movies">
      <SearchForm
        setSearchQuery={handleSearchFilms}
        isShortFilms={isShortFilms}
        setIsShortFilms={handleShortFilms}
        errorText={errorText}
        error={error}
      />

      <MoviesCardList
        films={isShortFilms ? shortFilms : filterFilms}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        saveCard={saveCard}
        isLoading={isLoading}
      />
    </section>
  );
}

export default Movies;
