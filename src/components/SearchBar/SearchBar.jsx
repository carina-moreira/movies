import "./SearchBar.scss";
import { useState } from "react";
/**
 * Renders a search bar component that allows the user to search for movies by name.
 *
 * @param {function} onSubmit - A callback function that is called when the form is submitted. It receives the search term as a parameter.
 * @return {JSX.Element} The search bar component.
 */
const SearchBar = ({ onSubmit }) => {
  const [term, setTerm] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(term);
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div className="search-bar">
      <h1>Search by movie name:</h1>
      <form onSubmit={handleFormSubmit}>
        <input value={term} onChange={handleChange} />
      </form>
    </div>
  );
};

export default SearchBar;
