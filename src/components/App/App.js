import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import UserNavigation from "../UserNavigation/UserNavigation.js";
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

import cards from "../../utils/Cards";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header component={<Navigation reg="/signup" way="signin" />} />
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
              <Header
                component={
                  <UserNavigation
                    film="/movies"
                    save="/saved-movies"
                    profile="/profile"
                  />
                }
              />
              <Main component={<Movies cards={cards} />} />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header
                component={
                  <UserNavigation
                    film="/movies"
                    save="/saved-movies"
                    profile="/profile"
                  />
                }
              />
              <Main component={<SavedMovies cards={cards} />} />
              <Footer />
            </>
          }
        />
        <Route path="/signup" element={<Main component={<Register />} />} />
        <Route path="/signin" element={<Main component={<Login />} />} />
        <Route
          path="/profile"
          element={
            <>
              <Header
                component={
                  <UserNavigation
                    film="/movies"
                    save="/saved-movies"
                    profile="/profile"
                  />
                }
              />
              <Main component={<Profile />} />
            </>
          }
        />
        <Route path="/*" element={<Main component={<PageNotFound />} />} />
      </Routes>
    </div>
  );
}

export default App;
