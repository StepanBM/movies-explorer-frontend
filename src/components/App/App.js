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
              <Main />
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
              <Movies cards={cards} />
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
              <SavedMovies cards={cards} />
              <Footer />
            </>
          }
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
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
              <Profile />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
