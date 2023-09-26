import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  params,
  valueParams,
  films,
  isShortFilms,
  setIsShortFilms,
  handleFilterFilms,
}) {
  //const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = React.useState([]);
  //const [filmsWithTumbler, setFilmsWithTumbler] = React.useState([]);
  //const [filmsShowed, setFilmsShowed] = React.useState(null);
  //const [film, setFilms] = React.useState(null);

  function searchInput(evt) {
    evt.preventDefault();
    const query = evt.target.value;
    params(query);
  }

  function searchForm(evt) {
    evt.preventDefault();
    handleFilterFilms(films);
  }

  const [tumbler, setTumbler] = React.useState(true);

  function handleGetMoviesTumbler(tumbler) {
    let filterDataShowed = [];
    //let filterData = [];
    // console.log(tumbler);
    console.log(tumbler);
    if (tumbler) {
      setTumbler(false);
      filterDataShowed = films;
      return filterDataShowed;
      //filterData = films.filter(({ duration }) => duration <= 40);
    } else {
      //filterData = filmsWithTumbler;
      setTumbler(true);
      filterDataShowed = films.filter(({ duration }) => duration <= 40);
      return filterDataShowed;
    }

    // localStorage.setItem("films", JSON.stringify(filterDataShowed.concat(filterData)));
    //localStorage.setItem("filmsTumbler", tumbler);
    //setFilmsShowed(filterDataShowed);
    //setFilms(filterData);
  }
  const handleChangeTumbler = () => setIsShortFilms(!isShortFilms);

  return (
    <section className="search">
      <form className="search__form" onSubmit={searchForm}>
        <div className="search__container">
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            name="search"
            required
            onChange={searchInput}
          />
          <button className="search__button" type="submit"></button>
        </div>
        <FilterCheckbox onChange={handleChangeTumbler} checked={isShortFilms} />
      </form>
    </section>
  );
}

export default SearchForm;
