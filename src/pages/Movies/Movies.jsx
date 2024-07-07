import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../../services/api.js";
import MoviesList from "./../../components/MoviesList/MoviesList.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";

/**
 * Returns a new URLSearchParams object based on the current location search parameters.
 *
 * @return {URLSearchParams} A new URLSearchParams object
 */
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Movies = () => {
  const query = useQuery().get("query");
  const [movies, setMovies] = useState([]);

  /**
   * Fetches movies based on the provided query and updates the state with the results.
   */
  useEffect(() => {
    const getMovies = async () => {
      if (query) {
        const result = await searchMovies(query);
        setMovies(result.results);
      }
    };
    getMovies();
  }, [query]);

  /**
   * Handles the search submission by fetching movies based on the provided term and updating the state with the results.
   *
   * @param {type} term - The search term to be used for fetching movies.
   * @return {type} No return value.
   */
  const handleSearchSubmit = (term) => {
    searchMovies(term).then((result) => setMovies(result.results));
  };

  return (
    <div className="movies">
      <Navbar onSearchSubmit={handleSearchSubmit}></Navbar>
      {movies.length === 0 ? (
        <div className="search__noresults">
          <p>Sorry, no movies were found with this title.</p>
          <p>Try again!</p>
        </div>
      ) : (
        <MoviesList movies={movies} />
      )}
    </div>
  );
};

export default Movies;
