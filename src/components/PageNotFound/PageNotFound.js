import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <section className="wrong">
      <div className="wrong__container">
        <h1 className="wrong__title">404</h1>
        <p className="wrong__text">Страница не найдена</p>
      </div>
      <Link to="/" className="wrong__link">
        Назад
      </Link>
    </section>
  );
}

export default PageNotFound;
