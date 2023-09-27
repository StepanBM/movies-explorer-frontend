import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

import Preloader from "../Preloader/Preloader";

function MoviesCardList({ films, onSaveMovie, onDeleteMovie, saveCard, isLoading }) {
  let location = useLocation();

  const screenWidth = React.useRef(window.innerWidth);

  const [isInitialDisplayOfMovies, setIsInitialDisplayOfMovies] = React.useState(12);
  const [addingNumberOfMovies, setAddingNumberOfMovies] = React.useState(3);
  const [isButtonMore, setIsButtonMore] = React.useState(true);

  React.useEffect(() => {
    displayMoviesFromWidth();

    return () => {
      window.removeEventListener("resize", displayMoviesFromWidth);
    };
  }, []);

  function displayMoviesFromWidth() {
    if (screenWidth.current > 1099 && screenWidth.current < 1279) {
      setIsInitialDisplayOfMovies(12);
      setAddingNumberOfMovies(3);
    } else if (screenWidth.current <= 1099 && screenWidth.current > 689) {
      setIsInitialDisplayOfMovies(8);
      setAddingNumberOfMovies(2);
    } else if (screenWidth.current <= 689 && screenWidth.current >= 320) {
      setIsInitialDisplayOfMovies(5);
      setAddingNumberOfMovies(2);
    }
    const localMovies = JSON.parse(localStorage.getItem("movies"));
    setIsButtonMore(localMovies);
  }

  function handleMoreBtnClick() {
    const newAmountx = addingNumberOfMovies + isInitialDisplayOfMovies;
    setIsInitialDisplayOfMovies(newAmountx);
    if (newAmountx >= films.length) {
      setIsButtonMore(true);
    } else {
      setIsButtonMore(false);
    }
  }

  function onMoreBtnClick() {
    handleMoreBtnClick(addingNumberOfMovies);
  }

  function getMovies() {
    return films
      .slice(0, isInitialDisplayOfMovies)
      .map((item) => (
        <MoviesCard
          key={item.id}
          card={item}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          save={saveCard}
        />
      ));
  }

  function getSaveMovies() {
    return films.map((item) => (
      <MoviesCard
        key={item._id}
        card={item}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        save={saveCard}
      />
    ));
  }

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <section className="list-movies">
          <ul className="list-movies__container">
            {location.pathname === "/movies" ? getMovies() : getSaveMovies()}
          </ul>

          {location.pathname === "/movies" && !isButtonMore ? (
            <button className="list-movies__more" type="button" onClick={onMoreBtnClick}>
              Ещё
            </button>
          ) : (
            ""
          )}
        </section>
      )}
    </>
  );
}

export default MoviesCardList;
