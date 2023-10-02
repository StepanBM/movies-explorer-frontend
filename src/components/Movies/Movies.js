import React, { useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { MOVIES_SHORT } from "../../utils/constants";

function Movies({
  onSaveMovie,
  onDeleteMovie,
  saveCard,
  isLoading,
  initialCards,
  errorText,
  error,
  setErrorText,
  setError,
  likeCard,
  setLikeCard,
}) {
  const [filterFilms, setFilterFilms] = React.useState(
    JSON.parse(localStorage.getItem("filteredFilms")) || []
  );
  const [shortFilms, setShortFilms] = React.useState(
    JSON.parse(localStorage.getItem("shortFilms")) || []
  );
  const [filterShortFilms, setFilterShortFilms] = React.useState(
    JSON.parse(localStorage.getItem("filteredShortFilms")) || []
  );
  const [isShortFilms, setIsShortFilms] = React.useState(
    localStorage.getItem("checkbox") === "true" ? true : false
  );

  useEffect(() => {
    setFilterFilms(JSON.parse(localStorage.getItem("filteredFilms")));
    setFilterShortFilms(JSON.parse(localStorage.getItem("filteredShortFilms")));
    setShortFilms(JSON.parse(localStorage.getItem("shortFilms")));
  }, [isShortFilms]);

  function handleShortFilms(v) {
    console.log("не if");
    setErrorText("");
    if (filterFilms) {
      console.log("if");
      setIsShortFilms(!isShortFilms);
      if (!isShortFilms) {
        const shortFilms = filterFilms.filter((film) => film.duration <= MOVIES_SHORT);
        setShortFilms(shortFilms);
        if (shortFilms.length === 0) {
          setError(true);
          setErrorText("Ничего не найдено");
        } else {
          setError(false);
        }
        localStorage.setItem(
          "shortFilms",
          JSON.stringify(filterFilms.filter((film) => film.duration <= MOVIES_SHORT))
        );
        setFilterShortFilms(filterFilms.filter((film) => film.duration <= MOVIES_SHORT));
        localStorage.setItem(
          "filteredShortFilms",
          JSON.stringify(filterFilms.filter((film) => film.duration <= MOVIES_SHORT))
        );
      } else {
        setFilterFilms(filterFilms);
        setIsShortFilms(!isShortFilms);
        console.log(!isShortFilms);
      }
    } else {
      setIsShortFilms(!isShortFilms);
    }
  }

  function handleSearchFilms(v) {
    const inputValueFilms = v.toLowerCase();

    const newCards = isShortFilms
      ? shortFilms.filter((card) => {
          return (
            card.nameRU.toLowerCase().includes(inputValueFilms) ||
            card.nameEN.toLowerCase().includes(inputValueFilms)
          );
        })
      : initialCards.filter((card) => {
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
    isShortFilms ? setFilterShortFilms(newCards) : setFilterFilms(newCards);
    isShortFilms
      ? localStorage.setItem("filteredShortFilms", JSON.stringify(newCards))
      : localStorage.setItem("filteredFilms", JSON.stringify(newCards));
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
