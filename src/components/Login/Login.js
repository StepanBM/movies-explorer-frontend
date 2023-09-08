import React from "react";
import logo from "../../images/logo.svg"
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
return (
    <section className="authentication">
      <Link to="/"><img className="authentication__logo" src={logo} alt="Логотип"/></Link>
      <h2 className="authentication__title">Рады видеть!</h2>
      <form className="authentication__form" >
        <label className="authentication__item">
            <p className="authentication__text">E-mail</p>
        <input
          className="authentication__input"
          name="email"
          type="email"
          placeholder="E-mail"
          defaultValue="pochta@yandex.ru"
          required
        />
        <span className="authentication__error"></span>
        </label>
        <label className="authentication__item">
            <p className="authentication__text">Пароль</p>
        <input
          className="authentication__input"
          name="password"
          type="password"
          placeholder="Пароль"

          required
        />
        <span className="authentication__error"></span>
        </label>
        <button className="authentication__submit" type="submit">
        Войти
        </button>
      </form>
      <p className="authentication__question">
      Уже зарегистрированы?
        <Link to="/signin" className="authentication__link">
        Регистрация
        </Link>
      </p>
    </section>
  );
}

 export default Login;