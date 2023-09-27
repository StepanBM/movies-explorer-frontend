import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ cards, onSaveMovie, onDeleteMovie, saveCard, isLoading }) {
  const [filterFilms, setFilterFilms] = React.useState(cards);
  const [isShortFilms, setIsShortFilms] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");

  // Фильтр короткометражек в Movies
  function handleShortFilms(v) {
    setIsShortFilms(v);
    if (!isShortFilms) {
      setFilterFilms(cards.filter((film) => film.duration <= 40));
    } else {
      setFilterFilms(cards);
    }
  }

  //Поиск фильмов в Movies
  function handleSearchFilms(v) {
    const newCards = cards.filter((card) => {
      return (
        card.nameRU.toLowerCase().includes(v.toLowerCase()) ||
        card.nameEN.toLowerCase().includes(v.toLowerCase())
      );
    });

    if (newCards.length === 0) {
      setError(true);
      setErrorText("Ничего не найдено");
    } else if (v.toLowerCase().length === 0) {
      setError(true);
      setErrorText("Нужно ввести ключевое слово");
    } else {
      setError(false);
    }
    setFilterFilms(newCards);
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
        films={filterFilms}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        saveCard={saveCard}
        isLoading={isLoading}
      />
    </section>
  );
}

export default Movies;
