import React from "react";
import "./NavTab.css";


function NavTab() {

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__point">
          <a className="navigation__link" href="#project">О проекте</a>
        </li>
        <li className="navigation__point">
          <a className="navigation__link" href="#technologies">Технологии</a>
        </li>
        <li className="navigation__point">
          <a className="navigation__link" href="#student">Студент</a>
        </li>
      </ul>
    </nav>
  );
};
  
export default NavTab;