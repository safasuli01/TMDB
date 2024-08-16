import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

function MovieList({ onFavoriteToggle }) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMovies(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const fetchMovies = (page, query) => {
    const endpoint = query ? 'https://api.themoviedb.org/3/search/movie' : 'https://api.themoviedb.org/3/movie/popular';
    
    axios.get(endpoint, {
      params: {
        api_key: '777af543ac5ace392fe7fe1ff9e8a60d',
        page: page,
        query: query,  // If there's a search term, include it in the API request
      }
    })
    .then(response => {
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);  // Reset to the first page on new search
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(startPage + 3, totalPages);

    if (endPage - startPage < 3) {
      startPage = Math.max(1, endPage - 3);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="container mt-5">
      <div className="search-bar mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onFavoriteToggle={onFavoriteToggle} 
          />
        ))}
      </div>
      <div className='d-flex justify-content-center m-4'> 
         <div className="pagination-container">
        <button 
          className={`page-arrow ${currentPage === 1 ? 'disabled' : ''}`} 
          onClick={() => handlePageClick(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button 
          className={`page-arrow ${currentPage === totalPages ? 'disabled' : ''}`} 
          onClick={() => handlePageClick(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
      </div>
    
    </div>
  );
}

export default MovieList;
