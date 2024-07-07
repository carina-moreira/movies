import React from "react";
import "./MovieCard.scss";
import star from "./../../assets/imgs/icon_star.svg";
import noimage from "./../../assets/imgs/find.png";

const MovieCard = ({ movie }) => {
  const { id, title, release_date, vote_average, poster_path } = movie;

  return (
    <div className="card" key={id}>
      {poster_path ? (
        <img
          className="card__img"
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={title}
        />
      ) : (
        /* TODO: add a better image for the purpuse  */
        <img className="noimage" src={noimage} alt={title}></img>
      )}
      {(title || release_date || vote_average) && (
        <div className="card__info">
          {title && <p className="card__info--title">{title}</p>}

          {release_date && (
            <div className="card__info__detail">
              {/* TODO : Add other fields */}
              {/*
              <span className="card__info__detail--time"></span>
              <span className="card__info__detail--cat"></span>
              */}
              {release_date && (
                <span className="card__info__detail--date">{release_date}</span>
              )}
            </div>
          )}
          {vote_average && (
            <div className="card__info__rating">
              <span className="card__info__rating--val">{vote_average}/10</span>
              <img className="card__info__rating--star" src={star} alt="star" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
