import React from "react";
import { Link } from "react-router-dom";
import "./UserNavigation.css";

function UserNavigation({ film, save, profile }) {
  const [menuActive, setMenuActive] = React.useState(false);

  function onClickBurgerMenu() {
    setMenuActive(!menuActive);
  }

  return (
    <div className="user-navigation">
      <button
        className="user-navigation__icon"
        type="button"
        onClick={onClickBurgerMenu}
      />
      <div
        className={
          menuActive
            ? "user-navigation__container user-navigation__container_active"
            : "user-navigation__container"
        }
      >
        <nav
          className={
            menuActive
              ? "user-navigation__menu user-navigation__menu_active"
              : "user-navigation__menu"
          }
        >
          <button
            className={
              menuActive
                ? "user-navigation__close user-navigation__active"
                : "user-navigation__close"
            }
            type="button"
            onClick={onClickBurgerMenu}
          ></button>
          <ul className="user-navigation__list">
            <li className="user-navigation__item">
              <Link
                to="/"
                className={
                  menuActive
                    ? "user-navigation__main user-navigation__active"
                    : "user-navigation__main"
                }
              >
                Главная
              </Link>
            </li>
            <li className="user-navigation__item">
              <Link to={film} className="user-navigation__film">
                Фильмы
              </Link>
            </li>
            <li className="user-navigation__item">
              <Link to={save} className="user-navigation__save-film">
                Сохранённые фильмы
              </Link>
            </li>
            <li className="user-navigation__item">
              <Link to={profile} className="user-navigation__account">
                Аккаунт
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default UserNavigation;
