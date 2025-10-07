import "dotenv/config";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const genAI = new GoogleGenerativeAI(process.env.POLLYGLOT_GENAI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const promptText = `
  You are Polly Glot, a master translator.
  Translate this text *only* into the requested language.
  Do not include pronunciation, explanations, or romanization.
  Output only the translation text itself, nothing else.
  Text: ${prompt}`


    const results = await model.generateContent(promptText);
    const response = await results.response
    const rawText = response.text()
    const text = rawText.replace(/\*\*(.*?)\*\*/g, '$1').trim();

    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Something went wrong!" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


