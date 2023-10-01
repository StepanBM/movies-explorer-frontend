import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm({ setSearchQuery, isShortFilms, setIsShortFilms, errorText, error }) {
  let location = useLocation();
  const [search, setSearch] = React.useState(
    location.pathname === "/movies"
      ? localStorage.getItem("searchQuery") || ""
      : localStorage.getItem("saveSearchQuery") || ""
  );
  const handleSearch = (evt) => {
    evt.preventDefault();
    setSearchQuery(search);
    location.pathname === "/movies"
      ? localStorage.setItem("searchQuery", search)
      : localStorage.setItem("saveSearchQuery", search);
  };

  const handleChangeSearchQuery = (evt) => {
    location.pathname === "/movies"
      ? localStorage.setItem("searchQuery", evt.target.value)
      : localStorage.setItem("saveSearchQuery", evt.target.value);
    // localStorage.setItem('searchQuery', evt.target.value)
    setSearch(evt.target.value);
  };

  const handleChangeTumbler = () => {
    localStorage.setItem("checkbox", !isShortFilms);
    setIsShortFilms(!isShortFilms);
  };
  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSearch}>
        <div className="search__container">
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            name="search"
            onChange={handleChangeSearchQuery}
            value={search}
          />
          <button className="search__button" type="submit"></button>
        </div>
        {error ? <span className="search__error">{errorText}</span> : ""}
        <FilterCheckbox onChange={handleChangeTumbler} checked={isShortFilms} />
      </form>
    </section>
  );
}

export default SearchForm;
