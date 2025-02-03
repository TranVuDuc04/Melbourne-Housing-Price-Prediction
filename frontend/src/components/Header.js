import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
// src/components/Header.js

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">MELBOURNE HOUSING ANALYSIS</div>
      <nav className={isMenuOpen ? 'nav open' : 'nav'}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/about" onClick={toggleMenu}>About</Link>
      </nav>
      <button className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </header>
  );
};

export default Header;
