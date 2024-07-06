import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { fetchMovies } from "../../services/api.js";
import { useState } from "react";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const handleSubmit = async (term) => {
    const result = await fetchMovies(term);
    setMovies(result);
  };
  return (
    <div>
      <SearchBar onSubmit={handleSubmit}></SearchBar>
    </div>
  );
};

export default Home;
