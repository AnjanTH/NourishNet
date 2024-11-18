require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json()); 
app.post("/generate-recipe", async (req, res) => {
    try {
        const { ingredients } = req.body;
        console.log("Received ingredients:", ingredients);

        if (!ingredients || ingredients.length === 0) {
            return res.status(400).send("Ingredients are required.");
        }

        const prompt = `Generate a recipe using the following ingredients: ${ingredients.join(", ")}.`;
        console.log("Generated prompt:", prompt);

        const result = await model.generateContent(prompt);
        console.log("Generated recipe:", result);
        const recipeText = await result.response.text(); 
        console.log("Generated recipe text:", recipeText);
        res.json({ recipe: recipeText });
    } catch (error) {
        console.error("Error generating recipe:", error);
        res.status(500).send("Error generating recipe.");
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
