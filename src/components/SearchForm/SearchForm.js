import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
   return (
     <form className="search">
       <div className="search__container">
         <input className="search__input" placeholder="Фильм" type="text" required />
         <button type="submit" className="search__button"></button>
       </div>
       <FilterCheckbox/>
     </form>
   );
 };

 export default SearchForm;