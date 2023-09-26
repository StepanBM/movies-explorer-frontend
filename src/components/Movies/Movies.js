import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ cards, onSaveMovie, onDeleteMovie, saveCard, isLoggedIn }) {
  console.log(cards);
  const [filterFilms, setFilterFilms] = React.useState(cards);
  const [isShortFilms, setIsShortFilms] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");

  /*React.useEffect(() => {
    if (isLoggedIn) return;
    let filterFilms = cards.filter(
      (film) =>
        film.nameRU.toLowerCase().includes(valueParams.toLowerCase()) ||
        film.nameEN.toLowerCase().includes(valueParams.toLowerCase())
    );
    if (isShortFilms) {
      filterFilms = filterFilms.filter((film) => film.duration <= 40);
    }
    setFilterFilms(filterFilms);
  }, [cards, isShortFilms, isLoggedIn, valueParams]);

  function handleShortFilms() {
    setIsShortFilms(!isShortFilms);
  }*/
  // Функция фильтрации карточек в Movies по ключевому слову
  // function handleFilterFilms() {
  //   console.log(searchQuery);
  //   const newCards = cards.filter((card) => {
  //     return (
  //       card.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       card.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   });
  //   if (newCards.length === 0) {
  //     setError(true);
  //     setErrorText("Ничего не найдено");
  //   } else if (searchQuery.toLowerCase().length === 0) {
  //     setError(true);
  //     setErrorText("Нужно ввести ключевое слово");
  //   } else {
  //     setError(false);
  //   }

  //   localStorage.setItem("filterCards", JSON.stringify(newCards));
  //   setFilterFilms(JSON.parse(localStorage.getItem("filterCards")));
  //   localStorage.setItem(
  //     "valueParams.toLowerCase()",
  //     JSON.stringify(valueParams.toLowerCase())
  //   );
  //   localStorage.setItem("isShortFilms", JSON.stringify(isShortFilms));
  // }

  function handleShortFilms(v) {
    setIsShortFilms(v);
    if (!isShortFilms) {
      setFilterFilms(cards.filter((film) => film.duration <= 40));
    } else {
      setFilterFilms(cards);
    }
  }

  //Функция фильтрации карточек в Movies по ключевому слову
  function handleSearchFilms(v) {
    const newCards = filterFilms.filter((card) => {
      return (
        card.nameRU.toLowerCase().includes(v.toLowerCase()) ||
        card.nameEN.toLowerCase().includes(v.toLowerCase())
      );
    });
    console.log(v, newCards);
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
    // localStorage.setItem("filterCards", JSON.stringify(newCards));
    // setFilterFilms(JSON.parse(localStorage.getItem("filterCards")));
    // localStorage.setItem(
    //   "valueParams.toLowerCase()",
    //   JSON.stringify(searchQuery.toLowerCase())
    // );
    // localStorage.setItem("isShortFilms", JSON.stringify(isShortFilms));
  }

  return (
    <section className="movies">
      <SearchForm
        setSearchQuery={handleSearchFilms} //setSearchValue
        isShortFilms={isShortFilms} //tumbler
        setIsShortFilms={handleShortFilms} //setTumbler
      />
      <MoviesCardList
        films={filterFilms}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        saveCard={saveCard}
      />
    </section>
  );
}

export default Movies;
