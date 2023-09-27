import React from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
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

import { CurrentUserContext } from "../../contexts/currentUserContext";

import approved from "../../images/Approved.png";
import wrong from "../../images/Wrong.png";

function App() {
  const navigate = useNavigate();
  //Данные пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentCards, setCurrentCards] = React.useState([]);
  const [saveCard, setSaveCard] = React.useState([]);

  const [popupAnswer, setPopupAnswer] = React.useState("");
  const [infoTooltip, setInfoTooltip] = React.useState(false);
  const [popupImage, setPopupImage] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  function onRegister(name, email, password) {
    setIsLoading(true);
    auth
      .registerNewUser(name, email, password)
      .then(() => {
        setIsLoggedIn(true);
        setPopupImage(approved);
        setPopupAnswer("Вы успешно зарегистрировались!");
        handleInfoTooltip();
        navigate("/movies");
      })
      .catch(() => {
        setPopupImage(wrong);
        setPopupAnswer("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      })
      .finally(() => setIsLoading(false));
  }

  function onLogin(email, password) {
    setIsLoading(true);
    auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
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
      })
      .finally(() => setIsLoading(false));
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  //Закрытие попапа
  function closeAllPopups() {
    setInfoTooltip(false);
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkValidityToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser({ email: res.email, name: res.name, _id: res._id });
          } else {
            setIsLoggedIn(false);
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
          setCurrentUser(user);
        })
        .catch((err) => {
          console.error(err);
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
          setSaveCard(card);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    return;
  }, [isLoggedIn]);

  function handleUpdateUser(data) {
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
      });
  }

  React.useEffect(() => {
    if (isLoggedIn === true) {
      setIsLoading(true);
      moviesApi
        .getInitialMovies()
        .then((card) => {
          setCurrentCards(card);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    return;
  }, [isLoggedIn]);

  // обработчик добавления фильма в избранное
  function handleSaveMovie(data) {
    mainApi
      .addMovies(data)
      .then((newCard) => {
        setSaveCard([newCard, ...saveCard]);
      })
      .catch((err) => console.log(err));
  }

  // обработчик удаления фильма из избранного
  function handleDeleteMovie(filmDelete) {
    mainApi
      .removeMovies(filmDelete._id)
      .then(() => {
        setSaveCard((item) => item.filter((card) => card._id !== filmDelete._id));
      })
      .catch((err) => console.log(err));
  }

  function logOutOfYourAccount() {
    setIsLoggedIn(false);
    setCurrentUser({});
    setCurrentCards([]);
    localStorage.removeItem("jwt");
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
                          cards={currentCards}
                          onSaveMovie={handleSaveMovie}
                          onDeleteMovie={handleDeleteMovie}
                          saveCard={saveCard}
                          isLoading={isLoading}
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
                          isLoading={isLoading}
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
              element={<Main component={<Register onRegister={onRegister} />} />}
            />
            <Route
              path="/signin"
              element={<Main component={<Login onLogin={onLogin} />} />}
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
