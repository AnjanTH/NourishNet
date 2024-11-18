import React, { useState, useEffect, useRef } from "react";
import { Snackbar, Button, CircularProgress } from "@mui/material";

const RecipeGenerator = () => {
    const [ingredients, setIngredients] = useState("");
    const [recipe, setRecipe] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [loadingImage, setLoadingImage] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    const [paused, setPaused] = useState(false);
    const utteranceRef = useRef(null);

    const generateRecipe = async () => {
        setImageURL("");
        setRecipe("");
        stopSpeech(); // Stop TTS if a new recipe is being generated
        setOpenSnackbar(true);

        try {
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
            setOpenSnackbar(false);

            // Generate Image
            generateRecipeImage(data.recipe);
        } catch (err) {
            console.error("Error generating recipe:", err);
            setOpenSnackbar(false);
        }
    };

    const generateRecipeImage = async (recipeDescription) => {
        setLoadingImage(true);

        try {
            const response = await fetch("http://localhost:3000/generate-recipe-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: recipeDescription }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate recipe image");
            }

            const data = await response.json();
            setImageURL(data.imageURL);
        } catch (err) {
            console.error("Error generating recipe image:", err);
            setImageURL("");
        } finally {
            setLoadingImage(false);
        }
    };

    // Text-to-Speech Functionality
    const startSpeech = () => {
        if (recipe) {
            const utterance = new SpeechSynthesisUtterance(recipe);
            utterance.voice = window.speechSynthesis
                .getVoices()
                .find((voice) => voice.name.includes("Female") || voice.name.includes("Google UK English Female")); // Female voice
            utterance.rate = 1; // Adjust speed if needed
            utterance.onend = () => {
                setSpeaking(false);
            };
            utteranceRef.current = utterance;
            setSpeaking(true);
            setPaused(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    const pauseSpeech = () => {
        if (speaking && !paused) {
            window.speechSynthesis.pause();
            setPaused(true);
        }
    };

    const resumeSpeech = () => {
        if (speaking && paused) {
            window.speechSynthesis.resume();
            setPaused(false);
        }
    };

    const stopSpeech = () => {
        if (speaking) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
            setPaused(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Recipe Generator</h1>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients, separated by commas"
                style={styles.input}
            />
            <Button
                onClick={generateRecipe}
                variant="contained"
                style={styles.button}
            >
                Generate Recipe
            </Button>

            <Snackbar
                open={openSnackbar}
                message="Generating Recipe..."
                autoHideDuration={2000}
            />

            <div style={styles.recipeContainer}>
                {recipe && (
                    <>
                        <h2>Generated Recipe:</h2>
                        <div
                            style={styles.recipeText}
                            dangerouslySetInnerHTML={{ __html: recipe }}
                        />
                        
                        <div style={styles.ttsButtons}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={startSpeech}
                                disabled={speaking}
                            >
                                Play
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={pauseSpeech}
                                disabled={!speaking || paused}
                            >
                                Pause
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={resumeSpeech}
                                disabled={!speaking || !paused}
                            >
                                Resume
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={stopSpeech}
                                disabled={!speaking}
                            >
                                Stop
                            </Button>
                        </div>
                    </>
                )}

                {loadingImage && <CircularProgress style={styles.loader} />}
                {imageURL && (
                    <div style={styles.imageContainer}>
                        <h3>Recipe Image:</h3>
                        <img
                            src={imageURL}
                            alt="Generated Recipe"
                            style={styles.image}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
    },
    input: {
        padding: "10px",
        width: "300px",
    },
    button: {
        marginLeft: "10px",
    },
    recipeContainer: {
        marginTop: "20px",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    recipeText: {
        fontSize: "18px", // Increased font size for clarity
        lineHeight: "1.8",
        color: "#333",
        backgroundColor: "#f1f1f1", // Soft background for better readability
        padding: "15px",
        borderRadius: "8px",
        border: "1px solid #ddd", // Soft border for distinction
        wordWrap: "break-word",
        whiteSpace: "pre-wrap", // Ensures new lines in the recipe text
        marginTop: "15px",
    },
    ttsButtons: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
    },
    imageContainer: {
        marginTop: "20px",
        textAlign: "center",
    },
    image: {
        maxWidth: "100%",
        borderRadius: "8px",
    },
    loader: {
        display: "block",
        margin: "20px auto",
    },
};

export default RecipeGenerator;
