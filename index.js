import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = process.env.PORT || 3000;

// ✅ Use CORS with your Firebase Hosting URL
app.use(cors({
  origin: ["https://campus-loop-e722a.web.app"],
  methods: ["GET", "POST"],
}));

app.use(bodyParser.json());

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Test home route
app.get("/", (req, res) => {
  res.send("✅ Campus Loop Chatbot with Gemini is running!");
});

// ✅ Chatbot route
app.post("/chatbot", async (req, res) => {
  const userMessage = req.body.message;
  console.log("Received:", userMessage);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error("❌ Gemini error:", err);
    res.status(500).json({ reply: "❌ Sorry, I couldn't process that." });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
