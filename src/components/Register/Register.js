import React from "react";
import logo from "../../images/logo.svg"
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
return (
    <section className="registration">
      <Link to="/"><img className="registration__logo" src={logo} alt="Логотип"/></Link>
      <h2 className="registration__title">Добро пожаловать!</h2>
      <form className="registration__form" >
      <label className="registration__item">
            <p className="registration__text">Имя</p>
        <input
          className="registration__input"
          name="name"
          type="name"
          placeholder="Имя"
          defaultValue="Виталий"
          required
        />
        <span className="registration__error"></span>
        </label>
        <label className="registration__item">
            <p className="registration__text">E-mail</p>
        <input
          className="registration__input"
          name="email"
          type="email"
          placeholder="E-mail"
          defaultValue="pochta@yandex.ru"
          required
        />
        <span className="registration__error"></span>
        </label>
        <label className="registration__item">
            <p className="registration__text">Пароль</p>
        <input
          className="registration__input"
          name="password"
          type="password"
          placeholder="Пароль"
          defaultValue="••••••••••••••"
          required
        />
        <span className="registration__error">Что-то пошло не так...</span>
        </label>
        <button className="registration__submit" type="submit">
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