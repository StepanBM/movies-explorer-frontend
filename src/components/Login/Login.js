import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import "./Login.css";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLoginEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleLoginPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <section className="authentication">
      <Link to="/">
        <img className="authentication__logo" src={logo} alt="Логотип" />
      </Link>
      <h1 className="authentication__title">Рады видеть!</h1>
      <form className="authentication__form" onSubmit={handleSubmit}>
        <label className="authentication__item">
          E-mail
          <input
            className="authentication__input"
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={handleLoginEmail}
            required
          />
          <span className="authentication__error"></span>
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
            onChange={handleLoginPassword}
            required
          />
          <span className="authentication__error"></span>
        </label>
        <button className="authentication__submit" type="submit">
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
