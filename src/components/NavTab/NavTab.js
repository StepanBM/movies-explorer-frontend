import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <a className="navigation__link" href="#project">
          <li className="navigation__point">О проекте</li>
        </a>
        <a className="navigation__link" href="#technologies">
          <li className="navigation__point">Технологии</li>
        </a>
        <a className="navigation__link" href="#student">
          <li className="navigation__point">Студент</li>
        </a>
      </ul>
    </nav>
  );
}

export default NavTab;
