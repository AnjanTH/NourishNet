import React from "react";
import { Link } from "react-router-dom";
import "./PageHome.css"; // Optional: Add CSS for styling.

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to FoodLink</h1>
        <p>Connecting restaurants, NGOs, and orphanages to reduce food waste.</p>
      </header>

      <div className="home-buttons">
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
        <Link to="/register" className="btn btn-secondary">
          Register
        </Link>
      </div>

      <section className="home-features">
        <h2>Features</h2>
        <ul>
          <li>Donate surplus food easily.</li>
          <li>Track logistics and delivery in real-time.</li>
          <li>Find nearby NGOs and orphanages using maps.</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
