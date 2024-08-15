import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navbar({wishlistCount}) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
          <i class="fa-solid fa-film"></i> MOVIES</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <form className="d-flex w-50 justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-dark" type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">
<<<<<<< HEAD
                  <FontAwesomeIcon icon={faHeart} className="text-danger " /> 
=======
                  <FontAwesomeIcon icon={faHeart} className="text-danger" /> 
                  {wishlistCount > 0 && <span className='badge bg-danger ms-2'>
                    {wishlistCount}
                    </span>}
>>>>>>> 3d14d283ea2cb18928ca3e5fd42346af9e870756
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
