import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

import { useValidationForm, EMAIL_PATTERN } from "../../utils/Validation";
import { CurrentUserContext } from "../../contexts/currentUserContext";

function Profile({ onUpdateUser, onSignOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useValidationForm({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [isDisabled, setIsDisabled] = React.useState(true);

  React.useEffect(() => {
    if (currentUser.name !== values.name || currentUser.email !== values.email) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [values, currentUser]);

  function handleSubmit(evt) {
    console.log(values);
    evt.preventDefault();
    if (isValid) {
      onUpdateUser(values);
    }
  }

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form" onSubmit={handleSubmit}>
        <label className="profile__item">
          Имя
          <div className="profile__container">
            <input
              className="profile__input"
              name="name"
              type="text"
              value={values.name}
              minLength="2"
              maxLength="24"
              placeholder="Имя"
              onChange={handleChange}
              required
            />
            <span className="profile__error">{errors["name"]}</span>
          </div>
        </label>
        <label className="profile__item">
          E-mail
          <div className="profile__container">
            <input
              className="profile__input"
              name="email"
              type="email"
              value={values.email}
              placeholder="E-mail"
              onChange={handleChange}
              required
              pattern={EMAIL_PATTERN}
            />
            <span className="profile__error">{errors["email"]}</span>
          </div>
        </label>
        <button className="profile__edit" type="submit" disabled={!isValid || isDisabled}>
          Редактировать
        </button>
      </form>
      <Link to="/" className="profile__exit" onClick={onSignOut}>
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
