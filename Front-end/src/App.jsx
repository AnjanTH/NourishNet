import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageHome from "./Pages/Home/PageHome";
import Register from "./Pages/AuthPages/Register";
import Login from "./Pages/AuthPages/Login"
import RecipeGenerator from "./Pages/Foodrecipe/FoodRecipes";


function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="/recipes" element={<RecipeGenerator/>}/>
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
