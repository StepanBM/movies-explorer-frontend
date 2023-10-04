import React from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

import Navigation from "../Navigation/Navigation";
import UserNavigation from "../UserNavigation/UserNavigation";

function Header({ isLoggedIn }) {
  let location = useLocation();

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      {!isLoggedIn && location.pathname === "/" ? (
        <Navigation reg="/signup" way="signin" />
      ) : (
        <UserNavigation film="/movies" save="/saved-movies" profile="/profile" />
      )}
    </header>
  );
}
export default Header;
