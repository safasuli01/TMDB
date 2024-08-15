import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

function MovieList({ onFavoriteToggle }) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = (page) => {
    axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: '777af543ac5ace392fe7fe1ff9e8a60d',
        page: page,
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
      <div className="row">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onFavoriteToggle={onFavoriteToggle} 
          />
        ))}
      </div>
      <div className='pagi d-flex justify-content-center'>

      <div className="pagination-container w-25 m-4">
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
