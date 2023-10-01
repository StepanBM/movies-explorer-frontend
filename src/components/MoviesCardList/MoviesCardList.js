import React, { useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

import Preloader from "../Preloader/Preloader";

import {
  MOVIE_SCREEN_BIG,
  MOVIE_SCREEN_MIDDLE,
  MOVIE_SCREEN_MOBILE,
  MOVIE_SCREEN_FIVE,
  MOVIE_SCREEN_EIGHT,
  MOVIE_SCREEN_TWELVE,
  MOVIE_ADD_TWO,
  MOVIE_ADD_THREE,
  MOVIE_SCREEN,
} from "../../utils/constants";

function MoviesCardList({ films, onSaveMovie, onDeleteMovie, saveCard, isLoading }) {
  let location = useLocation();

  const screenWidth = React.useRef(window.innerWidth);

  const [isInitialDisplayOfMovies, setIsInitialDisplayOfMovies] = React.useState(12);
  const [addingNumberOfMovies, setAddingNumberOfMovies] = React.useState(0);
  const [isButtonMore, setIsButtonMore] = React.useState(false);

  React.useEffect(() => {
    displayMoviesFromWidth();
    window.addEventListener("resize", displayMoviesFromWidth);
  }, []);

  useEffect(() => {
    setIsButtonMore(films?.length > isInitialDisplayOfMovies);
  }, [films?.length, isInitialDisplayOfMovies]);

  function displayMoviesFromWidth() {
    if (screenWidth.current > MOVIE_SCREEN_BIG) {
      setIsInitialDisplayOfMovies(MOVIE_SCREEN_TWELVE);
      setAddingNumberOfMovies(MOVIE_ADD_THREE);
      if (films.length < MOVIE_SCREEN_TWELVE) setIsButtonMore(MOVIE_SCREEN);
    } else if (
      screenWidth.current <= MOVIE_SCREEN_BIG &&
      screenWidth.current > MOVIE_SCREEN_MIDDLE
    ) {
      setIsInitialDisplayOfMovies(MOVIE_SCREEN_EIGHT);
      setAddingNumberOfMovies(MOVIE_ADD_TWO);
      if (films.length < MOVIE_SCREEN_EIGHT) setIsButtonMore(MOVIE_SCREEN);
    } else if (
      screenWidth.current <= MOVIE_SCREEN_MIDDLE &&
      screenWidth.current >= MOVIE_SCREEN_MOBILE
    ) {
      setIsInitialDisplayOfMovies(MOVIE_SCREEN_FIVE);
      setAddingNumberOfMovies(MOVIE_ADD_TWO);
      if (films.length < MOVIE_SCREEN_FIVE) setIsButtonMore(MOVIE_SCREEN);
    }
  }

  function handleMoreBtnClick() {
    console.log(addingNumberOfMovies, "dsadasdd");
    const newAmountx = addingNumberOfMovies + isInitialDisplayOfMovies;
    setIsInitialDisplayOfMovies(newAmountx);
  }

  function onMoreBtnClick() {
    displayMoviesFromWidth();
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
          saveCardId={saveCard}
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
        saveCardId={saveCard}
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
            {location.pathname === "/movies"
              ? films && getMovies()
              : films && getSaveMovies()}
          </ul>

          {location.pathname === "/movies" && isButtonMore ? (
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
