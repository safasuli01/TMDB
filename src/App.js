import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MovieList from './components/MovieList/MovieList';
import Wishlist from './components/WishList/Wishlist';
import './App.css';

function App() {
  const [wishlist, setWishlist] = useState(() => {
    //localStorage
    const savedWashList = localStorage.getItem('washlist');
    return savedWashList ? JSON.parse(savedWashList) : []})

    useEffect(() =>{
      localStorage.setItem('washlist', JSON.stringify(wishlist));
    }, [wishlist])
    
  const handleFavoriteToggle = (movie) => {
    if (wishlist.find(m => m.id === movie.id)) {
      setWishlist(wishlist.filter(m => m.id !== movie.id));
    } else {
      setWishlist([...wishlist, movie]);
    }
  };
  
  

  return (
    <div className="App">
      <Navbar wishlistCount={wishlist.length} />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<MovieList onFavoriteToggle={handleFavoriteToggle} />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onFavoriteToggle={handleFavoriteToggle} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;