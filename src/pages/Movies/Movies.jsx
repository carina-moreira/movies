import "./Movies.scss";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../../services/api.js";
import MoviesList from "./../../components/MoviesList/MoviesList.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";

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
  const [term, setTerm] = useState([]);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      if (query) {
        const result = await searchMovies(query);
        setMovies(result.results);
        setCurrentPage(1); // Reset to first page on new search
      }
    };
    getMovies();
  }, [query]);

  const handleSearchSubmit = (term) => {
    setTerm(term);
    navigate(`/movies?query=${term}`); // to update the URL
    searchMovies(term).then((result) => {
      setMovies(result.results);
      setCurrentPage(1); // Reset to first page on new search
    });
  };

  // Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // TODO: Make search term persist on browser after page reload
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
            <div className="movies__header__">SORT</div>
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
