import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <div className="search__container">
          <input className="search__input" placeholder="Фильм" type="text" required />
          <button className="search__button" type="submit"></button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
