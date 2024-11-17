import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [pincode, setPincode] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !location || !pincode || !role) {
      setMessage('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setMessage('Password must be at least 8 characters long and contain at least one letter and one number.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8080/register',
        { username, email, password, location, pincode, role },
        { withCredentials: true }
      );

      if (response?.status === 200) {
        setMessage('Registration successful!');
        setTimeout(() => navigate('/Dashboard'), 1000);
      } else {
        setMessage('Unexpected response format.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response) {
        if (error.response.data?.message === 'User already exists') {
          setMessage('User already exists. Redirecting to login...');
          setTimeout(() => navigate('/login'), 1500);
        } else {
          setMessage(error.response.data?.message || 'An error occurred during registration.');
        }
      } else if (error.request) {
        setMessage('No response from server. Please try again later.');
      } else {
        setMessage('An error occurred while processing your request.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <header className="register-header">
          <h2>Register Here</h2>
        </header>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="text"
            placeholder="Enter your pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="input-field"
            required
          />
          <div className="role-selection">
            <label className="role-label">Role:</label>
            <div className="role-options">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={(e) => setRole(e.target.value)}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="donor"
                  checked={role === 'donor'}
                  onChange={(e) => setRole(e.target.value)}
                />
                Donor
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {message && (
          <p
            className={`message ${message.includes('successful') ? 'success' : 'error'}`}
          >
            {message}
          </p>
        )}

        <Link to="/login" className="link">
          Already have an account? Login here
        </Link>
      </div>
    </div>
  );
}

export default Register;
