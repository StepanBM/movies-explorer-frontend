import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ checked, onChange }) {
  return (
    <div className="filter">
      <label className="filter__tumbler">
        <input
          className="filter__checkbox"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <span className="filter__slide" />
      </label>
      <p className="filter__title">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
