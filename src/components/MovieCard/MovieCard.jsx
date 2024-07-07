import React from "react";
import "./MovieCard.scss";
import star from "./../../assets/imgs/icon_star.svg";
import noimage from "./../../assets/imgs/icon_noimage.svg";

const MovieCard = ({ movie }) => {
  const { id, title, release_date, vote_average, poster_path } = movie;
  const genre = movie.genres?.map((genre) => genre.name).join(", ");

  const time = movie.runtime;
  /**
   * Calculates the hours and minutes from the given time.
   *
   * @param {number} time - The total time in minutes
   * @return {string} The formatted time in hours and minutes
   */
  function toHoursAndMinutes(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}h${minutes > 0 ? `${minutes} ` : ""}`;
  }

  /**
   * Function to convert a date string in "yyyy-mm-dd" format to "dd month yyyy".
   * @param {string} dateString - The date string in "yyyy-mm-dd" format.
   * @returns {string} The formatted date string in "dd month yyyy".
   */
  const formatDate = (dateString) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Create a Date object from the input dateString
    const date = new Date(dateString);

    // Extract day, month, and year from the Date object
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Format the date as "dd month yyyy"
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;

    return formattedDate;
  };

  const formattedReleaseDate = formatDate(release_date);

  return (
    <div className="card" key={id}>
      {poster_path ? (
        <img
          className="card__img"
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={title}
        />
      ) : (
        <img className="noimage" src={noimage} alt={title}></img>
      )}
      {(title || release_date || genre || time) && (
        <div className="card__info">
          {title && <p className="card__info--title">{title}</p>}

          {(release_date || genre || time) && (
            <div className="card__info__detail">
              {time && (
                <span className="card__info__detail--time">
                  {toHoursAndMinutes(time)}|
                </span>
              )}

              {genre && (
                <span className="card__info__detail--genre"> {genre} |</span>
              )}

              {release_date && (
                <span className="card__info__detail--date">
                  {" "}
                  {formattedReleaseDate}
                </span>
              )}
            </div>
          )}

          <div className="card__info__rating">
            <span className="card__info__rating--val">{vote_average}/10</span>
            <img className="card__info__rating--star" src={star} alt="star" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
