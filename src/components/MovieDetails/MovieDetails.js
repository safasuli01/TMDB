import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
  const { collectionId } = useParams(); // Get the collectionId from the URL
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = '777af543ac5ace392fe7fe1ff9e8a60d';

    const fetchCollection = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/collection/${collectionId}?api_key=${API_KEY}`);
        setCollection(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchCollection();
  }, [collectionId]);

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  if (!collection) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <div className="poster">
        <img src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`} alt={collection.name} />
      </div>
      <div className="details">
        <h2>{collection.name}</h2>
        <p>{collection.overview}</p>
        <div className="genres">
          {collection.parts.map(part => (
            <span key={part.id} className="genre-tag">{part.title}</span>
          ))}
        </div>
        <div className="extra-details">
          <p>Total Movies: {collection.parts.length}</p>
        </div>
        <button className="website-btn">Website</button>
      </div>
    </div>
  );
};

export default MovieDetails;
