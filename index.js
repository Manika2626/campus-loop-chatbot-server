import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Campusloop Gemini API is running!");
});

app.post("/chat", async (req, res) => {
  try {
    const userPrompt = req.body.prompt;
    console.log("User prompt:", userPrompt);

    // ✅ MOCK RESPONSE
    res.json({
      bot: `MOCK: You said "${userPrompt}". Here's a fake Campusloop feature idea!`
    });

    // ❌ Real Gemini call commented out for now:
    /*
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const result = await model.generateContent(userPrompt);
    const response = await result.response;

    res.json({
      bot: response.text()
    });
    */

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong", details: error });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
