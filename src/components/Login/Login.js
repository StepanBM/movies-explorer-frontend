import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import "./Login.css";
import { useValidationForm } from "../../utils/Validation";

function Login({ onLogin }) {
  const { values, handleChange, errors, isValid } = useValidationForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      onLogin(values);
    }
  }

  return (
    <section className="authentication">
      <Link to="/">
        <img className="authentication__logo" src={logo} alt="Логотип" />
      </Link>
      <h1 className="authentication__title">Рады видеть!</h1>
      <form className="authentication__form" onSubmit={handleSubmit} noValidate>
        <label className="authentication__item">
          E-mail
          <input
            className={`authentication__input ${
              errors && errors["emaill"] && "authentication__input_type_error"
            }`}
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={handleChange}
            required
          />
          <span className="authentication__error">
            {errors && errors["email"] && errors["email"]}
          </span>
        </label>
        <label className="authentication__item">
          Пароль
          <input
            className="authentication__input"
            name="password"
            type="password"
            minLength="5"
            maxLength="24"
            placeholder="Пароль"
            onChange={handleChange}
            required
          />
          <span className="authentication__error">
            {errors && errors["password"] && errors["password"]}
          </span>
        </label>
        <button className="authentication__submit" type="submit" disabled={!isValid}>
          Войти
        </button>
      </form>
      <p className="authentication__question">
        Ещё не зарегистрированы?
        <Link to="/signup" className="authentication__link">
          Регистрация
        </Link>
      </p>
    </section>
  );
}

export default Login;
