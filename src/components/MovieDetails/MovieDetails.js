import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';
import RecommendationCard from '../RecommendationCard/RecommendationCard';
import LanguageContext from '../../context/languageContext';
const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const {lang} = useContext(LanguageContext)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=5e690a505730fa2354d7f86895a89102&language=${lang === 'en' ? 'en-US' : 'ar'}`);
        if (!response.ok) throw new Error('Failed to fetch movie data');
        const data = await response.json();
        setMovie(data);

        const recResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=5e690a505730fa2354d7f86895a89102&language=${lang === 'en' ? 'en-US' : 'ar'}&page=1`);
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
  }, [lang, movieId]);

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
          <span><strong>{lang === 'en' ? 'Duration' : 'المدة'}</strong> {movie.runtime} {lang === 'en' ? 'Mins.' : 'د.'}.</span>
          <span><strong>{lang === 'en' ? 'language' : 'اللغة'}:</strong> {movie.original_language}</span>
          </div>
        </div>
      </div>
      <div>
        <img src={`https://image.tmdb.org/t/p/w500${movie.production_companies[0||1||2||3]?.logo_path}`} alt={`${movie.production_companies[0].name}`}/>
      </div>
      <div>
        <a href={movie.homepage} target='_blank' rel='noreferrer'>Website</a>
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
            <p>{lang === 'en'? 'No recommendations available.' : 'ﻻ يوجد مقترحات يوصى بها.'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
