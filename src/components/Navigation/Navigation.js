import React from "react";
 import { Link } from "react-router-dom";
 import "./Navigation.css";

function Navigation({reg, way}) {
   return (
    <nav className="menu">
      <ul className="menu__list">
         <li className="menu__point">
            <Link to={reg} className="menu__registration">Регистрация</Link>
         </li>
         <li className="menu__point">
            <Link to={way} className="menu__input">Войти</Link>
         </li>
      </ul>
   </nav>
   )
}
export default Navigation;