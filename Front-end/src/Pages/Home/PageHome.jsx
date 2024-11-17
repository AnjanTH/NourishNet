import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import "./PageHome.css";

const Home = () => {
  return (
    <div className="container">
      <div className="home-container">
        <header className="home-header">
          <h1>
            Connecting to <span style={{ color: "#28a745" }}>Surplus Smiles</span>
          </h1>
          <p>
            Helping to reduce food waste while spreading smiles by connecting
            restaurants, NGOs, and orphanages.
          </p>
          <Link to="/login" className="get-started-btn">
            Get Started
          </Link>
        </header>

        {/* Features Section */}
        <section className="home-features">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Easy Donations</h3>
              <p>Donate surplus food effortlessly with just a click.</p>
            </div>
            <div className="feature-item">
              <h3>Real-Time Tracking</h3>
              <p>Track logistics and delivery of your donations in real-time.</p>
            </div>
            <div className="feature-item">
              <h3>Nearby NGOs & Orphanages</h3>
              <p>Find and connect with local organizations using an interactive map.</p>
            </div>
          </div>
        </section>

        {/* Impact Stats Section with Animation */}
        <section className="impact-stats">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <p className="rotating-number">
                <CountUp start={0} end={50000} duration={5} separator="," />
              </p>
              <h3>Meals Donated</h3>
            </div>
            <div className="stat-item">
              <p className="rotating-number">
                <CountUp start={0} end={20000} duration={5} separator="," />
              </p>
              <h3>People Helped</h3>
            </div>
            <div className="stat-item">
              <p className="rotating-number">
                <CountUp start={0} end={150} duration={5} separator="," />
              </p>
              <h3>NGOs Reached</h3>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="social-proof">
          <p>
            "FoodLink helped us save thousands of meals and make a real difference in our community!"
            <br />
            - NGO Partner
          </p>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2>Join the Movement</h2>
          <p>Start donating today and make an impact!</p>
          <Link to="/donate" className="cta-btn">Donate Now</Link>
        </section>
        <section className="volunteer-section">
          <h2>Become a Volunteer</h2>
          <p>Help distribute food and make a difference in your community.</p>
          <Link to="/volunteer" className="volunteer-btn">Volunteer Today</Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
