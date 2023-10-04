import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <section className="wrong">
      <div className="wrong__container">
        <h1 className="wrong__title">404</h1>
        <p className="wrong__text">Страница не найдена</p>
      </div>
      <Link to="/" className="wrong__link" onClick={() => navigate(-1)}>
        Назад
      </Link>
    </section>
  );
}

export default PageNotFound;
