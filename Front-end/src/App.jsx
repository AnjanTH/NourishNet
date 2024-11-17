import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageHome from "./Pages/Home/PageHome";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<PageHome />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
