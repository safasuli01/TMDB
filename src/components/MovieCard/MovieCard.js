import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "./MovieCard.css";

function MovieCard({ movie, onFavoriteToggle }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Check if the movie is already in the wishlist (e.g., from localStorage or state)
    // and update `isFavorited` accordingly.
  }, []);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    onFavoriteToggle(movie);
  };

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "path_to_default_image.png";

  const percentage = Math.round(movie.vote_average * 10);
  const radius = 20;  // Adjusted for a smaller size
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
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
            <div className="progress-circle">
              <svg className="progress-ring" width="50" height="50">
                <circle
                  className="progress-ring__circle"
                  stroke="url(#gradient)"
                  strokeWidth="5"
                  fill="transparent"
                  r={radius}
                  cx="25"
                  cy="25"
                  style={{
                    strokeDasharray: `${circumference} ${circumference}`,
                    strokeDashoffset: offset,
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff5722" />
                    <stop offset="100%" stopColor="#ffcc00" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="progress-text">{percentage}%</div>
            </div>
            <button
              className="btn btn-link p-0"
              onClick={handleFavoriteClick}
              aria-label={isFavorited ? "Unfavorite" : "Favorite"}
            >
              <FontAwesomeIcon
                icon={isFavorited ? solidHeart : regularHeart}
                className={isFavorited ? "text-danger" : "text-dark"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
