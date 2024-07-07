import "./Movies.scss";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../../services/api.js";
import MoviesList from "./../../components/MoviesList/MoviesList.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import SortingSelectbox from "../../components/Sort/Sort.jsx";

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
  const [term, setTerm] = useState(localStorage.getItem("searchTerm") || "");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const moviesPerPage = 8;
  const navigate = useNavigate();

  /**
   * Retrieves movies based on the provided query.
   *
   * @return {Promise<void>} A promise that resolves when the movies are retrieved.
   */
  useEffect(() => {
    const getMovies = async () => {
      if (query) {
        const result = await searchMovies(query);
        setMovies(result.results);
        setCurrentPage(1); // Reset to first page on new search
      } else if (term) {
        // If there's no query in the URL but there's a term in localStorage, search by the term
        const result = await searchMovies(term);
        setMovies(result.results);
      }
    };
    getMovies();
  }, [query, term]);

  /**
   * A function that handles the submission of a search term.
   *
   * @param {string} term - The search term entered by the user.
   * @return {void} Updates the state with search results and resets current page.
   */
  const handleSearchSubmit = (term) => {
    setTerm(term);
    localStorage.setItem("searchTerm", term);

    navigate(`/movies?query=${term}`); // to update the URL
    searchMovies(term).then((result) => {
      setMovies(result.results);
      setCurrentPage(1); // Reset to first page on new search
    });
  };

  /**
   * Sorts the movies array based on the provided order.
   *
   * @param {string} order - The order in which the movies should be sorted. Can be either "asc" for ascending order or any other value for descending order.
   * @return {void} Updates the state of the movies array with the sorted movies.
   */
  const sortMovies = (order) => {
    const sortedMovies = [...movies].sort((a, b) => {
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      if (order === "asc") {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else {
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      }
    });
    setMovies(sortedMovies);
  };

  /**
   * Updates the sort order and sorts the movies based on the new sort order.
   *
   * @param {Event} e - The event object triggered by the sort change.
   * @return {void} This function does not return anything.
   */
  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    sortMovies(newSortOrder);
  };

  // Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber); // Save current page to local storage
  };

  return (
    <div className="movies">
      <Navbar onSearchSubmit={handleSearchSubmit}></Navbar>

      {/* No results */}
      {movies.length === 0 ? (
        <div className="search__noresults">
          <p>Sorry, no movies were found with this title.</p>
          <p>Try again!</p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="movies__header">
            {/* Search term */}
            <div className="movies__header__results">
              <p className="movies__header__results--term">
                {`Results for: '${term}'`}
              </p>
              <p className="movies__header__results--number">
                {`We found ${movies.length} results for '${term}'`}
              </p>
            </div>
            {/* Sorting */}
            <div className="movies__header__sort">
              <SortingSelectbox
                sortOrder={sortOrder}
                handleSortChange={handleSortChange}
              />
            </div>
          </div>

          {/* Movies list */}
          <MoviesList movies={currentMovies} />

          {/* Pagination */}
          <Pagination
            moviesPerPage={moviesPerPage}
            totalMovies={movies.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default Movies;
