import "./Sort.scss";
import React from "react";

/* TODO: add custom arrow icon */
const SortingSelectbox = ({ sortOrder, handleSortChange }) => {
  return (
    <div className="selectbox">
      <label htmlFor="sort">Sort by Name:</label>
      <select
        id="sort"
        className="selectbox__comp"
        value={sortOrder}
        onChange={handleSortChange}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortingSelectbox;
