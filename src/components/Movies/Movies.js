import React, { useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  onSaveMovie,
  onDeleteMovie,
  saveCard,
  isLoading,
  initialCards,
  errorText,
  error,
  setErrorText,
  shortFilms,
  setError,
}) {
  const [filterFilms, setFilterFilms] = React.useState(
    JSON.parse(localStorage.getItem("filteredFilms")) || []
  );
  const [filterShortFilms, setFilterShortFilms] = React.useState(
    JSON.parse(localStorage.getItem("filteredShortFilms")) || []
  );
  const [isShortFilms, setIsShortFilms] = React.useState(
    localStorage.getItem("checkbox") === "true" ? true : false
  );

  useEffect(() => {
    setErrorText("");
    setFilterFilms(JSON.parse(localStorage.getItem("filteredFilms")));
    setFilterShortFilms(JSON.parse(localStorage.getItem("filteredShortFilms")));
  }, [isShortFilms]);

  function handleShortFilms() {
    setIsShortFilms(!isShortFilms);
  }

  useEffect(() => {
    if (isShortFilms) {
      if (filterShortFilms.length === 0) {
        setError(true);
        setErrorText("Ничего не найдено");
      } else {
        setError(false);
      }
    }
  }, [filterShortFilms]);

  function handleSearchFilms(v) {
    const localFilterFilms = initialCards.filter((card) => {
      return (
        card.nameRU.toLowerCase().includes(v.toLowerCase()) ||
        card.nameEN.toLowerCase().includes(v.toLowerCase())
      );
    });
    const localFilterShortFilms = shortFilms.filter((card) => {
      return (
        card.nameRU.toLowerCase().includes(v.toLowerCase()) ||
        card.nameEN.toLowerCase().includes(v.toLowerCase())
      );
    });
    setFilterFilms(localFilterFilms);
    setFilterShortFilms(localFilterShortFilms);
    localStorage.setItem("filteredFilms", JSON.stringify(localFilterFilms));
    localStorage.setItem("filteredShortFilms", JSON.stringify(localFilterShortFilms));

    if (localFilterFilms.length === 0) {
      setError(true);
      setErrorText("Ничего не найдено");
    } else if (v.toLowerCase().length === 0) {
      setError(true);
      setErrorText("Нужно ввести ключевое слово");
    } else {
      setError(false);
    }
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
        films={isShortFilms ? filterShortFilms : filterFilms}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        saveCard={saveCard}
        isLoading={isLoading}
        setErrorText={setErrorText}
      />
    </section>
  );
}

export default Movies;
