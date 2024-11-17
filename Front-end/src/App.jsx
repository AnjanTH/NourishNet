import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageHome from "./Pages/Home/PageHome";
import Register from "./Pages/AuthPages/Register";
import Login from "./Pages/AuthPages/Login";
import Dashboard from "./Pages/Dashboard.jsx/Dashboard";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
