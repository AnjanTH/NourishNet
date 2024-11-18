import React, { useState } from "react";
import { Snackbar, Button } from "@mui/material";

const RecipeGenerator = () => {
    const [ingredients, setIngredients] = useState("");
    const [recipe, setRecipe] = useState("");
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const generateRecipe = async () => {
        setError(""); // Reset error before new request
        try {
            setOpenSnackbar(true); // Show snackbar with "Generating Recipe"

            const response = await fetch("http://localhost:3000/generate-recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ingredients: ingredients.split(",") }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate recipe");
            }

            const data = await response.json();
            setRecipe(data.recipe);
            setTimeout(() => setOpenSnackbar(false), 2000); // Hide snackbar after 2 seconds
        } catch (err) {
            setError("Error generating recipe: " + err.message);
            setOpenSnackbar(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Recipe Generator</h1>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients, separated by commas"
                style={{ padding: "10px", width: "300px" }}
            />
            <Button
                onClick={generateRecipe}
                variant="contained"
                style={{ marginLeft: "10px" }}
            >
                Generate Recipe
            </Button>

            {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

            <div style={{ marginTop: "20px" }}>
                <h2>Generated Recipe:</h2>
                <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                    {recipe}
                </div>
            </div>

            <Snackbar
                open={openSnackbar}
                message="Generating Recipe..."
                autoHideDuration={2000}
            />
        </div>
    );
};

export default RecipeGenerator;
