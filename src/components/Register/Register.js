import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import "./Register.css";
import { useValidationForm } from "../../utils/Validation";

function Register({ onRegister }) {
  const { values, handleChange, errors, isValid } = useValidationForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      onRegister(values);
    }
  }

  const EMAIL_PATTERN = "[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\\.[a-z]{2,}";

  return (
    <section className="registration">
      <Link to="/">
        <img className="registration__logo" src={logo} alt="Логотип" />
      </Link>
      <h1 className="registration__title">Добро пожаловать!</h1>
      <form className="registration__form" onSubmit={handleSubmit}>
        <label className="registration__item">
          Имя
          <input
            className="registration__input"
            name="name"
            type="text"
            minLength="2"
            maxLength="24"
            placeholder="Имя"
            onChange={handleChange}
            required
          />
          <span className="registration__error">{errors["name"]}</span>
        </label>
        <label className="registration__item">
          E-mail
          <input
            className="registration__input"
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={handleChange}
            required
            pattern={EMAIL_PATTERN}
          />
          <span className="registration__error">{errors["email"]}</span>
        </label>
        <label className="registration__item">
          Пароль
          <input
            className="registration__input"
            name="password"
            type="password"
            minLength="5"
            maxLength="24"
            placeholder="Пароль"
            onChange={handleChange}
            required
          />
          <span className="registration__error">{errors["password"]}</span>
        </label>
        <button className="registration__submit" type="submit" disabled={!isValid}>
          Зарегистрироваться
        </button>
      </form>
      <p className="registration__question">
        Уже зарегистрированы?
        <Link to="/signin" className="registration__link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
