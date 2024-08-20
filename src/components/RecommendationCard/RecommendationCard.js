import React from 'react';
import { Link } from 'react-router-dom';
import './RecommendationCard.css';

const RecommendationCard = ({ movie }) => {
  const formattedDate = new Date(movie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link to={`/collection/${movie.id}`} className="recommendation-card">
      <div className="recommendation-content">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <h4>{movie.title}</h4>
        <div className="release-date">{formattedDate}</div>
      </div>
    </Link>
  );
};

export default RecommendationCard;
