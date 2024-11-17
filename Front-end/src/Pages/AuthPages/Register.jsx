import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location,setLocation]=useState("");
  const [pincode,setPincode]=useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password||!location||!pincode) {
      setMessage('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8080/register',
        { username, email, password,location,pincode },
        { withCredentials: true }
      );
  
      if (response?.status === 200) {
        setMessage('Registration successful!.');
        setTimeout(() => navigate('/Dashboard'), 1000);
      } else {
        setMessage('Unexpected response format.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response) {
        console.error('Error response:', error.response); 
        setMessage(error.response.data?.message || 'An error occurred during registration.');
      } else if (error.request) {
        console.error('No response received:', error.request);  
        setMessage('No response from server. Please try again later.');
      } else {
        console.error('Error occurred while setting up the request:', error.message);
        setMessage('An error occurred while processing your request.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Register Here</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">
              location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">
              Pincode
            </label>
            <input
              type="number"
              id="pincode"
              placeholder="Enter your location"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-5 ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
