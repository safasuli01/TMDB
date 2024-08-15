import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './Wishlist.css';

function Wishlist({ wishlist, onFavoriteToggle }) {
  return (
    <div className="wishlist">
      <h2>My Wishlist</h2>
      <div className="row">
        {wishlist.length === 0 ? (
          <p>No movies in your wishlist</p>
        ) : (
          wishlist.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteToggle={onFavoriteToggle}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;
