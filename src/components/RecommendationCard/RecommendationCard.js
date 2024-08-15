import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import './RecommendationCard.css';

const RecommendationCard = ({ movie, handleFavoriteClick, isFavorited }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'path_to_default_image.png'; // Replace with your default image path

  return (
    <div className="col-md-2 mb-4">
      <div className="card h-100 recommendation-card">
        <img
          src={imageUrl}
          alt={movie.title}
          onError={(e) => (e.target.src = 'path_to_default_image.png')}
          className="card-img-top"
        />
        <div className="vote-average">
          <span className="badge bg-dark">{Math.round(movie.vote_average * 10)}%</span>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text">{new Date(movie.release_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
          <button
            className="btn btn-link p-0 more-options"
            onClick={() => handleFavoriteClick(movie.id)}
            aria-label="More options"
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
