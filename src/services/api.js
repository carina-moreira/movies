import axios from "axios";

const API_KEY = "5d4a64b8ede398cf2077dd4a640374da";
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Searches for movies based on the provided query.
 *
 * @param {string} query - The search term.
 * @param {number} page - The page number for pagination.
 * @return {Object} The response data from the API or an error message.
 */
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
  }
};

/**
 * Retrieves the details of a specific movie.
 *
 * @param {number} movieId - The ID of the movie.
 * @return {Object} The response data from the API or an error message.
 */
export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving movie details:", error);
  }
};
