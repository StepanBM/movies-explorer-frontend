import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form">
        <label className="profile__item">
          <p className="profile__text">Имя</p>
          <input
            className="profile__input"
            name="name"
            type="name"
            placeholder="Имя"
            defaultValue="Виталий"
            required
          />
        </label>
        <label className="profile__item">
          <p className="profile__text">E-mail</p>
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
      <Link to="/profile" className="profile__edit">
        Редактировать
      </Link>
      <Link to="/" className="profile__exit">
        Выйти из аккаунта
      </Link>
    </section>
  );
};

export default Profile;
