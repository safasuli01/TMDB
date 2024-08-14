import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MovieList from './components/MovieList/MovieList';
import Wishlist from './components/WishList/Wishlist';
import './App.css';

function App() {
  const [wishlist, setWishlist] = useState([]);

  const handleFavoriteToggle = (movie) => {
    if (wishlist.find(m => m.id === movie.id)) {
      setWishlist(wishlist.filter(m => m.id !== movie.id));
    } else {
      setWishlist([...wishlist, movie]);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<MovieList onFavoriteToggle={handleFavoriteToggle} />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
