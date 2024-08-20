import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';
import RecommendationCard from '../RecommendationCard/RecommendationCard';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=5e690a505730fa2354d7f86895a89102&language=en-US`);
        if (!response.ok) throw new Error('Failed to fetch movie data');
        const data = await response.json();
        setMovie(data);

        const recResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=5e690a505730fa2354d7f86895a89102&language=en-US&page=1`);
        if (!recResponse.ok) throw new Error('Failed to fetch recommendations');
        const recData = await recResponse.json();
        setRecommendations(recData.results);
      } catch (err) {
        setError('Error loading data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="no-data">No data found</div>;

  return (
    <div className="container">
      <div className="movie-details-container">
        <div className="movie-poster">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="movie-info">
          <p>{movie.overview}</p>
          <div className="movie-tags">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="tag">{genre.name}</span>
            ))}
          </div>
          <div className="movie-meta">
            <span><strong>Duration:</strong> {movie.runtime} Min.</span>
            <span><strong>Languages:</strong> {movie.original_language}</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="recommendations">
        <div className="recommendations-list">
          {recommendations.length > 0 ? (
            recommendations.map((recMovie) => (
              <RecommendationCard
                key={recMovie.id}
                movie={recMovie}
              />
            ))
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
