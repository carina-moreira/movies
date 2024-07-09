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
  const [term, setTerm] = useState(localStorage.getItem("searchTerm") || "");
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async () => {
    try {
      const result = await searchMovies(term);
      setMovies(result.results);

      // Save term to localStorage
      localStorage.setItem("searchTerm", term);

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
    } catch (error) {
      console.error("Error searching movies:", error);
      setError(
        "Sorry, an error occurred while searching for movies. Please try again."
      );
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
      {noResults === true && location.pathname !== "/movies" && (
        <div className="search__noresults">
          <p>Sorry, no movies were found with this title.</p>
          <p>Try again!</p>
        </div>
      )}
      {error && <div className="error__message">{error}</div>}
    </div>
  );
};

export default SearchBar;
