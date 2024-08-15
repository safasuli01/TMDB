import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navbar({wishlistCount}) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">MyApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
              </li>
            </ul>
            <form className="d-flex me-3">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">
                  <FontAwesomeIcon icon={faHeart} className="text-danger" /> 
                  {wishlistCount > 0 && <span className='badge bg-danger ms-2'>
                    {wishlistCount}
                    </span>}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <FontAwesomeIcon icon={faUser} /> Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;