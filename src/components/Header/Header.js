import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header({component}) {

    return (
        <header className="header">
            <Link to="/"><img className="header__logo" src={logo} alt="Логотип"/></Link>
            {component}
        </header>
    )
}
export default Header;
