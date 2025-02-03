// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import Home from './pages/Home';
import About from './pages/About';
import Insight from './pages/Insight';
import Checkout from './pages/Checkout';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<SearchForm />} />
          <Route path="/insight" element={<Insight />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
