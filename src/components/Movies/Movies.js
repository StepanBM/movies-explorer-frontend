import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ cards, onSaveMovie, onDeleteMovie, saveCard, isLoggedIn, isLoading }) {
  const [filterFilms, setFilterFilms] = React.useState(cards);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isShortFilms, setIsShortFilms] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  //localStorage.setItem("page", "/movies");
  // Фильтр короткометражек в Movies
  // function handleShortFilms(v) {
  //   setIsShortFilms(v);
  //   // if (!isShortFilms) {
  //   //   setFilterFilms(cards.filter((film) => film.duration <= 40));
  //   // } else {
  //   //   setFilterFilms(cards);
  //   // }
  //   const newCards = filterMovies();
  //   //console.log(isShortFilms, searchQuery, newCards);
  //   setFilterFilms(newCards);
  // }

  // //Поиск фильмов в Movies
  // function handleSearchFilms(v) {
  //   // let newCards = cards.filter((card) => {
  //   //   return (
  //   //     card.nameRU.toLowerCase().includes(v.toLowerCase()) ||
  //   //     card.nameEN.toLowerCase().includes(v.toLowerCase())
  //   //   );
  //   // });
  //   setSearchQuery(v);
  //   const newCards = filterMovies();
  //   // console.log(isShortFilms, searchQuery, newCards);
  //   if (newCards.length === 0) {
  //     setError(true);
  //     setErrorText("Ничего не найдено");
  //   } else if (v.toLowerCase().length === 0) {
  //     setError(true);
  //     setErrorText("Нужно ввести ключевое слово");
  //   } else {
  //     setError(false);
  //   }
  //   setFilterFilms(newCards);
  // }

  // function filterMovies() {
  //   let newCards = filterFilms.filter((card) => {
  //     return (
  //       card.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       card.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   });
  //   if (!isShortFilms) {
  //     newCards = newCards.filter((film) => film.duration <= 40);
  //   }
  //   return newCards;
  // }

  function handleShortFilms(v) {
    setIsShortFilms(v);
    if (!isShortFilms) {
      setFilterFilms(cards.filter((film) => film.duration <= 40));
    } else {
      setFilterFilms(cards);
    }
  }

  function handleSearchFilms(v) {
    const inputValueFilms = v.toLowerCase();
    const newCards = filterFilms.filter((card) => {
      return (
        card.nameRU.toLowerCase().includes(inputValueFilms) ||
        card.nameEN.toLowerCase().includes(inputValueFilms)
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
