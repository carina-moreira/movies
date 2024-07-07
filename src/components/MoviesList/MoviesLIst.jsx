import "./MoviesList.scss";
import MovieCard from "./../MovieCard/MovieCard.jsx";

const MoviesList = ({ movies }) => {
  const renderedMovies = movies.map((movie) => {
    return <MovieCard key={movie.id} movie={movie} />;
  });

  return (
    renderedMovies.length > 0 && (
      <div className="movieslist">{renderedMovies}</div>
    )
  );
};

export default MoviesList;
