import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ setSearchQuery, isShortFilms, setIsShortFilms, errorText, error }) {
  const [search, setSearch] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(search);
  };

  const handleChangeSearchQuery = (e) => setSearch(e.target.value);

  const handleChangeTumbler = () => setIsShortFilms(!isShortFilms);

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
