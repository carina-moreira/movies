import "./SearchBar.scss";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { searchMovies } from "./../../services/api.js";

/**
 * Function to handle searching for movies based on a search term,
 * updating the UI based on search results, and navigating to the movies page if no results on the homepage.
 *
 * @return {void} This function does not return anything.
 */
const SearchBar = ({ onSearchSubmit }) => {
  const [term, setTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async () => {
    const result = await searchMovies(term);
    setMovies(result.results);

    // To handle UI when there are no results
    result.results.length === 0 ? setNoResults(true) : setNoResults(false);

    // If on homepage, navigate to movies page with search term
    if (
      noResults === true &&
      (location.pathname === "/" || location.pathname === "/home")
    ) {
      navigate(`/movies?query=${term}`);
    }

    // If on movies page, call the onSearchSubmit callback
    if (location.pathname === "/movies") {
      onSearchSubmit(term);
    }
  };

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSearch();
        }}
      />
      {noResults === true &&
        (location.pathname === "/" || location.pathname === "/home") && (
          <div className="search__noresults">
            <p>Sorry, no movies were found with this title.</p>
            <p>Try again!</p>
          </div>
        )}
    </div>
  );
};

export default SearchBar;
