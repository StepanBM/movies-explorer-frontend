import React from "react";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

import PageNotFound from "../PageNotFound/PageNotFound";

import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";

import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Preloader from "../Preloader/Preloader";

import { MOVIES_SHORT } from "../../utils/constants";

import { CurrentUserContext } from "../../contexts/currentUserContext";

import approved from "../../images/Approved.png";
import wrong from "../../images/Wrong.png";

function App() {
  const navigate = useNavigate();
  //Данные пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem("jwt") || false
  );

  const [initialCards, setInitialCards] = React.useState([]);
  const [saveCard, setSaveCard] = React.useState([]);
  const [shortFilms, setShortFilms] = React.useState([]);

  const [popupAnswer, setPopupAnswer] = React.useState("");
  const [infoTooltip, setInfoTooltip] = React.useState(false);
  const [popupImage, setPopupImage] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");

  function onRegister({ name, email, password }) {
    setIsLoading(true);
    auth
      .registerNewUser(name, email, password)
      .then(() => {
        setPopupImage(approved);
        setPopupAnswer("Вы успешно зарегистрировались!");
        handleInfoTooltip();
        onLogin({ email, password });
      })
      .catch(() => {
        setPopupImage(wrong);
        setPopupAnswer("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onLogin({ email, password }) {
    setIsLoading(true);
    auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setCurrentUser({
          name: res.name,
          email: res.email,
        });
        setIsLoggedIn(true);
        setPopupImage(approved);
        setPopupAnswer("Добро пожаловать!");
        handleInfoTooltip();
        navigate("/movies");
      })
      .catch(() => {
        setPopupImage(wrong);
        setPopupAnswer("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  //Закрытие попапа
  function closeAllPopups() {
    setInfoTooltip(false);
  }

  React.useEffect(() => {
    // localStorage.removeItem('moviesCount')
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkValidityToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser({
              name: res.name,
              email: res.email,
            });
            //navigate("/movies");
          } else {
            setIsLoggedIn(false);
            //navigate("/");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn === true) {
      setIsLoading(true);
      mainApi
        .getUserInfo()
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          console.error(err);
          setErrorText(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. " +
              "Подождите немного и попробуйте ещё раз"
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    return;
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn === true) {
      setIsLoading(true);
      moviesApi
        .getInitialMovies()
        .then((cards) => {
          setInitialCards(cards);
          const startFilterCards = cards.filter((film) => film.duration <= MOVIES_SHORT);
          localStorage.setItem("shortFilms", JSON.stringify(startFilterCards));
          localStorage.setItem("longFilms", JSON.stringify(cards));
          localStorage.setItem("filteredShortFilms", JSON.stringify(startFilterCards));
          setShortFilms(startFilterCards);
        })
        .catch((err) => {
          console.error(err);
          setErrorText(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. " +
              "Подождите немного и попробуйте ещё раз"
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    return;
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn === true) {
      setIsLoading(true);
      mainApi
        .getMovies()
        .then((card) => {
          setIsLoggedIn(true);
          setSaveCard(card);
        })
        .catch((err) => {
          console.error(err);
          setErrorText(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. " +
              "Подождите немного и попробуйте ещё раз"
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    return;
  }, [isLoggedIn]);

  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .changeUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        setPopupImage(approved);
        setPopupAnswer("Данные изменены");
        handleInfoTooltip();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSaveMovie(data) {
    return mainApi.addMovies(data).then((newCard) => {
      setSaveCard([newCard, ...saveCard]);
      localStorage.setItem("saved-movies", JSON.stringify([newCard, ...saveCard]));
    });
  }

  function handleDeleteMovie(filmDelete) {
    return mainApi.removeMovies(filmDelete._id).then((res) => {
      const saveCardArray = saveCard.filter((card) => {
        return card._id !== filmDelete._id;
      });
      setSaveCard(
        saveCard.filter((card) => {
          return card._id !== filmDelete._id;
        })
      );

      localStorage.setItem("saved-movies", JSON.stringify(saveCardArray));
    });
  }

  function logOutOfYourAccount() {
    setIsLoggedIn(false);
    setCurrentUser({});
    setInitialCards([]);
    setErrorText("");
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header isLoggedIn={isLoggedIn} />
                  <Main
                    component={
                      <>
                        <Promo />
                        <AboutProject />
                        <Techs />
                        <AboutMe />
                        <Portfolio />
                      </>
                    }
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/movies"
              element={
                <>
                  <Header isLoggedIn={isLoggedIn} />
                  <Main
                    component={
                      <>
                        <ProtectedRouteElement
                          path="/movies"
                          isLoggedIn={isLoggedIn}
                          element={Movies}
                          onSaveMovie={handleSaveMovie}
                          onDeleteMovie={handleDeleteMovie}
                          saveCard={saveCard}
                          isLoading={isLoading}
                          initialCards={initialCards}
                          errorText={errorText}
                          error={error}
                          setError={setError}
                          setErrorText={setErrorText}
                          shortFilms={shortFilms}
                        />
                      </>
                    }
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <>
                  <Header isLoggedIn={isLoggedIn} />
                  <Main
                    component={
                      <>
                        <ProtectedRouteElement
                          path="/saved-movies"
                          element={SavedMovies}
                          isLoggedIn={isLoggedIn}
                          saveCard={saveCard}
                          onDeleteMovie={handleDeleteMovie}
                          errorText={errorText}
                          error={error}
                          setError={setError}
                          setErrorText={setErrorText}
                        />
                      </>
                    }
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <Main
                  component={
                    <Register
                      onRegister={onRegister}
                      isLoggedIn={isLoggedIn}
                      isLoading={isLoading}
                    />
                  }
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Main
                  component={
                    <Login
                      onLogin={onLogin}
                      isLoggedIn={isLoggedIn}
                      isLoading={isLoading}
                    />
                  }
                />
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Header isLoggedIn={isLoggedIn} />
                  <Main
                    component={
                      <>
                        <ProtectedRouteElement
                          path="/profile"
                          element={Profile}
                          isLoggedIn={isLoggedIn}
                          onUpdateUser={handleUpdateUser}
                          onSignOut={logOutOfYourAccount}
                          isLoading={isLoading}
                        />
                      </>
                    }
                  />
                </>
              }
            />
            <Route path="/*" element={<Main component={<PageNotFound />} />} />
          </Routes>
        )}
        <InfoTooltip
          title={popupAnswer}
          image={popupImage}
          isOpen={infoTooltip}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
