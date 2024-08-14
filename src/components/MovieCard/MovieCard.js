import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./MovieCard.css";
function MovieCard({ movie, onFavoriteToggle }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    onFavoriteToggle(movie);
  };

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "path_to_default_image.png"; // Replace with your default image path

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100">
        <img
          src={imageUrl}
          alt={movie.title}
          onError={(e) => (e.target.src = "path_to_default_image.png")}
          className="card-img-top"
        />
        <div className="card-body text-center">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text">{movie.release_date}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="badge bg-primary">{movie.vote_average}</span>
            <button
              className="btn btn-link p-0"
              onClick={handleFavoriteClick}
              aria-label={isFavorited ? "Unfavorite" : "Favorite"}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={isFavorited ? "text-danger" : "text-muted"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
