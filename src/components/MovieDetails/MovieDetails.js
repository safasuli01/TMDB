import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';
import RecommendationCard from '../RecommendationCard/RecommendationCard';

const MovieDetails = () => {
  const { movieId } = useParams(); // Extract movieId from the URL

  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    const fetchMovie = async () => {
      try {
        const [movieResponse, recommendationsResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`), // Use movieId
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`)
        ]);

        setMovie(movieResponse.data);
        setRecommendations(recommendationsResponse.data.results);
      } catch (err) {
        setError('Error loading data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]); // Depend on movieId to refetch data when it changes

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!movie) {
    return <div className="no-data">No data found</div>;
  }

  return (
    <div className="movie-details">
      {/* Movie details layout */}
      <div className="poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className="details">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        {/* Other movie details */}
      </div>
      
      {/* Recommendations section */}
      <div className="recommendations">
        <h3>Recommended Movies</h3>
        <div className="row">
          {recommendations.length > 0 ? (
            recommendations.map((recMovie) => (
              <RecommendationCard
                key={recMovie.id}
                movie={recMovie}
                handleFavoriteClick={(id) => console.log(`Favorite clicked for movie ${id}`)}
                isFavorited={false} // Adjust logic as necessary
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
