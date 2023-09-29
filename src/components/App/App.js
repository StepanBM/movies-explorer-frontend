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
    auth
      .registerNewUser(name, email, password)
      .then(() => {
        setPopupImage(approved);
        setPopupAnswer("Вы успешно зарегистрировались!");
        handleInfoTooltip();
        //onLogin(data.email, password);
        navigate("/signin");
      })
      .catch(() => {
        setPopupImage(wrong);
        setPopupAnswer("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  function onLogin(email, password) {
    auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        //setCurrentUser({ name: res.name, email: res.email });
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
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkValidityToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser({ name: res.name, email: res.email });
            //navigate("/movies");
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
          setIsLoggedIn(true);
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
          setIsLoggedIn(true);
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

  /* React.useEffect(() => {
    const page = localStorage.getItem("page");
    navigate(page);
  });*/

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

  function handleSaveMovie(data) {
    mainApi
      .addMovies(data)
      .then((newCard) => {
        setSaveCard([newCard, ...saveCard]);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteMovie(filmDelete) {
    mainApi
      .removeMovies(filmDelete._id)
      .then(() => {
        setSaveCard((item) =>
          item.filter((card) => (card._id === filmDelete._id ? false : true))
        );
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
