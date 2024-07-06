import axios from "axios";

const API_KEY = "5d4a64b8ede398cf2077dd4a640374da";
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

export const fetchMovies = async (term) => {
  if (!term) {
    throw new Error("Missing search term");
  }

  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: API_KEY },
      params: { query: term },
    });

    if (!response || !response.data || !response.data.results) {
      throw new Error("Invalid API response");
    }

    console.log("asdhjashds");
    console.log(response.data.results);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export default fetchMovies;
