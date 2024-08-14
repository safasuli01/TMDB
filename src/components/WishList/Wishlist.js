import React from 'react';
import './Wishlist.css';

function Wishlist({ wishlist }) {
  return (
    <div className="wishlist">
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No movies in your wishlist</p>
      ) : (
        wishlist.map(movie => (
          <div key={movie.id} className="wishlist-item">
            <img src={movie.posterUrl} alt={movie.title} className="wishlist-poster" />
            <div className="wishlist-info">
              <h5>{movie.title}</h5>
              <p>{movie.releaseDate}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;
