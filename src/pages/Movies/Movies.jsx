import React from "react";
import fetchMovies from "./../../services/api.js";
import { useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard.jsx";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const showMovies = async (all) => {
    const result = await fetchMovies(all);
    setMovies(result);

    console.log(setMovies);
  };

  return (
    <div>
      <MovieCard></MovieCard>
      <button onClick={showMovies}>Show Movies</button>
      <h1>Movies List</h1>
    </div>
  );
};

export default Movies;
