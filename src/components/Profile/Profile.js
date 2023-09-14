import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <label className="profile__item">
          Имя
          <input
            className="profile__input"
            name="text"
            type="text"
            minLength="2"
            maxLength="24"
            placeholder="Имя"
            defaultValue="Виталий"
            required
          />
        </label>
        <label className="profile__item">
          E-mail
          <input
            className="profile__input"
            name="email"
            type="email"
            placeholder="E-mail"
            defaultValue="pochta@yandex.ru"
            required
          />
        </label>
      </form>
      <button className="profile__edit" type="submit">
        Редактировать
      </button>
      <Link to="/" className="profile__exit">
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
