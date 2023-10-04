import React, { useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  saveCard,
  onDeleteMovie,
  errorText,
  error,
  setErrorText,
  setError,
}) {
  const [filterSaveFilms, setFilterSaveFilms] = React.useState([]);
  const [isShortSaveFilms, setIsShortSaveFilms] = React.useState(false);
  const [isShortSaveFilmsQuery, setIsShortSaveFilmsQuery] = React.useState("");

  useEffect(() => {
    setErrorText("");

    if (isShortSaveFilmsQuery) {
      if (isShortSaveFilms) {
        setFilterSaveFilms(
          handleSearchFilmsQuery(
            isShortSaveFilmsQuery,
            saveCard.filter((film) => film.duration <= 40)
          )
        );
        if (
          handleSearchFilmsQuery(
            isShortSaveFilmsQuery,
            saveCard.filter((film) => film.duration <= 40)
          ).length === 0
        ) {
          setError(true);
          setErrorText("Ничего не найдено");
        } else {
          setError(false);
        }
      } else {
        setFilterSaveFilms(handleSearchFilmsQuery(isShortSaveFilmsQuery, saveCard));
      }
    } else {
      if (isShortSaveFilms) {
        const savefilterMovies = saveCard.filter((film) => film.duration <= 40);
        setFilterSaveFilms(savefilterMovies);
        if (savefilterMovies.length === 0) {
          setError(true);
          setErrorText("Ничего не найдено");
        } else {
          setError(false);
        }
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
    if (newCards.length === 0) {
      setError(true);
      setErrorText("Ничего не найдено");
    } else if (isShortSaveFilmsQuery.toLowerCase().length === 0) {
      setError(true);
      setErrorText("Нужно ввести ключевое слово");
    } else {
      setError(false);
    }

    return newCards;
  }

  function handleShortSaveFilms(v) {
    let isShortSaveFilmsQuery = localStorage.getItem("saveSearchQuery");
    setIsShortSaveFilms(v);
    if (isShortSaveFilmsQuery) {
      const saveMoviesFilter = saveCard.filter((film) => film.duration <= 40);

      if (!isShortSaveFilms) {
        setFilterSaveFilms(
          handleSearchFilmsQuery(isShortSaveFilmsQuery, saveMoviesFilter)
        );

        if (handleSearchFilmsQuery(isShortSaveFilmsQuery, saveCard).length === 0) {
          setError(true);
          setErrorText("Ничего не найдено");
        } else {
          setError(false);
        }
      } else {
        setFilterSaveFilms(handleSearchFilmsQuery(isShortSaveFilmsQuery, saveCard));
      }

      if (saveMoviesFilter.length === 0) {
        setError(true);
        setErrorText("Ничего не найдено");
      } else {
        setError(false);
      }
    } else {
      if (!isShortSaveFilms) {
        const filterSaveMovies = saveCard.filter((film) => film.duration <= 40);
        setFilterSaveFilms(filterSaveMovies);

        if (filterSaveMovies.length === 0) {
          setError(true);
          setErrorText("Ничего не найдено");
        } else {
          setError(false);
        }
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
