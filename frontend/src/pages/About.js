// src/pages/About.js
import React from 'react';
import  './About.css';


const About = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      
      <section className="project-overview">
        <h2>Project Overview</h2>
        <p>
          Our Housing Market Analysis project aims to provide users with insightful and data-driven predictions about the housing market in Melbourne. Using advanced machine learning models, we analyze current and historical housing data to forecast trends and assist users in making informed decisions. Whether you are a buyer, seller, or investor, our tool offers valuable insights into market dynamics to help guide your housing-related decisions.
        </p>
      </section>
      
      <section className="how-it-works">
        <h2>How It Works</h2>
        <p>
          Our platform leverages data processing and machine learning techniques to predict housing prices in Melbourne. Through careful analysis and modeling, we can identify key factors influencing the market and offer reliable forecasts. Users can explore various insights into the Melbourne housing market, helping them stay informed about price changes, regional trends, and more.
        </p>
      </section>
      
      <section className="team">
        <h2>Meet the Team</h2>
        <ul>
          <li><strong>Vu Duc Tran</strong> - Student ID: 104175614</li>
          <li><strong>Manh Dung Nguyen</strong> - Student ID: 104181789</li>
          <li><strong>Tran Quang Minh Nguyen</strong> - Student ID: 104179687</li>
        </ul>
        <p>
          This project was created as part of the COS30049 – Computing Technology Innovation Project under the guidance of <strong>Dr. Wanlun Ma</strong> at Swinburne University of Technology.
        </p>
      </section>
    </div>
  );
};

export default About;
