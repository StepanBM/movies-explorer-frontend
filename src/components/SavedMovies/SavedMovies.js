import React, { useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ saveCard, onDeleteMovie }) {
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [filterSaveFilms, setFilterSaveFilms] = React.useState([]);
  const [isShortSaveFilms, setIsShortSaveFilms] = React.useState(
    localStorage.getItem("checkbox") === "true" ? true : false
  );
  const [isShortSaveFilmsQuery, setIsShortSaveFilmsQuery] = React.useState(
    localStorage.getItem("saveSearchQuery") || ""
  );

  useEffect(() => {
    console.log("useEffect сработал");
    setIsShortSaveFilmsQuery(localStorage.getItem("saveSearchQuery"));

    if (isShortSaveFilmsQuery) {
      if (isShortSaveFilms) {
        setFilterSaveFilms(
          handleSearchFilmsQuery(
            isShortSaveFilmsQuery,
            saveCard.filter((film) => film.duration <= 40)
          )
        );
      } else {
        console.log(handleSearchFilmsQuery(isShortSaveFilmsQuery, saveCard));
        setFilterSaveFilms(handleSearchFilmsQuery(isShortSaveFilmsQuery, saveCard));
      }
    } else {
      if (isShortSaveFilms) {
        setFilterSaveFilms(saveCard.filter((film) => film.duration <= 40));
      } else {
        setFilterSaveFilms(saveCard);
      }
    }
  }, [saveCard, isShortSaveFilms, isShortSaveFilmsQuery]);

  function handleSearchFilms(v) {
    const newCards = filterSaveFilms.filter((card) => {
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
    setFilterSaveFilms(newCards);
  }

  function handleSearchFilmsQuery(v, arr) {
    const newCards = arr.filter((card) => {
      return (
        card.nameRU.toLowerCase().includes(v.toLowerCase()) ||
        card.nameEN.toLowerCase().includes(v.toLowerCase())
      );
    });
    console.log(newCards);
    return newCards;
  }

  // Фильтр короткометражек
  function handleShortSaveFilms(v) {
    let isShortSaveFilmsQuery = localStorage.getItem("saveSearchQuery");
    setIsShortSaveFilms(v);
    if (isShortSaveFilmsQuery) {
      if (!isShortSaveFilms) {
        setFilterSaveFilms(
          handleSearchFilmsQuery(
            isShortSaveFilmsQuery,
            saveCard.filter((film) => film.duration <= 40)
          )
        );
      } else {
        setFilterSaveFilms(handleSearchFilmsQuery(isShortSaveFilmsQuery, saveCard));
      }
    } else {
      if (!isShortSaveFilms) {
        setFilterSaveFilms(saveCard.filter((film) => film.duration <= 40));
      } else {
        setFilterSaveFilms(saveCard);
      }
    }
  }

  return (
    <section className="saved-movies">
      <SearchForm
        setSearchQuery={handleSearchFilms}
        isShortFilms={isShortSaveFilms}
        setIsShortFilms={handleShortSaveFilms}
        errorText={errorText}
        error={error}
        setIsShortSaveFilmsQuery={setIsShortSaveFilmsQuery}
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
