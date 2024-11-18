import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/profile', {
          withCredentials: true, 
        });
        setUserData(response.data.user);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
      setUserData(null);
      navigate('/login');
    } catch (err) {
      console.error('Error during logout:', err);
      setError('Failed to log out. Please try again.');
    }
  };
  

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#f4f4f4" }}>
        <h1>Dashboard</h1>
        <nav style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ position: "relative" }}>
          <NavLink
           to="#"
            onClick={toggleDropdown}
           style={{
           textDecoration: "none",
           color: "#555",
           display: "flex",
           flexDirection: "column", 
           alignItems: "center",
           gap: "5px",
          fontWeight: "bold",
  }}
>
  <FaUserCircle size={24} />
  <span>My Profile</span>
</NavLink>

            {dropdownOpen && userData && (
              <div className="dropdown-menu">
                <div className="dropdown-item">
                  <strong>Username:</strong> {userData.username}
                </div>
                <div className="dropdown-item">
                  <strong>Email:</strong> {userData.email}
                </div>
                <div className="dropdown-item" style={{ backgroundColor: 'red', color: 'white' }} onClick={handleLogout}>
                      Logout
              </div>


              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Dashboard;
