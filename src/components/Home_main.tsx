import React from "react";
import "../styles/home_main.css";


const Main: React.FC = () => (
  <div className="hero-container">
    <div className="hero-overlay">
      <div className="hero-content">
        <h1>Your Health, Our Priority</h1>
        <p>Expert care, advanced technology, and compassionate healing.</p>
        <button type="button" id="main-page-explore-button">Explore</button>
      </div>
    </div>
  </div>
);

export default Main;
