// src/pages/Home.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import SearchForm from '../components/SearchForm';
import PricingPlans from '../components/PricingPlans';
import TeamSection from '../components/TeamSection';

const Home = () => {
  return (
    <div>
      { <HeroSection /> }
     {<SearchForm /> }
      {<PricingPlans /> }
      { <TeamSection /> }
    </div>
  );
};

export default Home;
