import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

function MovieList({ onFavoriteToggle }) {
  const [movies, setMovies] = useState([]);
  //sa
  const [wishlist, setWishlist] = useState ([])

  useEffect(() => {
    // Fetch movies from an API (e.g., The Movie Database)
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=777af543ac5ace392fe7fe1ff9e8a60d')
      .then(response => response.json())
      .then(data => setMovies(data.results));
  }, []);
  //sa
  const isMovieFavorited = (movieId) => wishlist.some(m => m.id === movieId);

  return (
    <div className="container mt-5">
      <div className="row">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onFavoriteToggle={onFavoriteToggle}
            //sa
            isFavorited={isMovieFavorited(movie.id)}
             
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
