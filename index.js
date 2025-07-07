// index.js

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";  // ✅ 1) Import CORS
// If you use Gemini later, replace OpenAI import accordingly
import OpenAI from "openai"; // Or remove if not used yet

const app = express();
const port = process.env.PORT || 3000;

// ✅ 2) Use CORS (allow all origins for now)
app.use(cors());

// ✅ 3) Parse JSON body
app.use(bodyParser.json());

// ✅ 4) Test home route
app.get("/", (req, res) => {
  res.send("✅ Campus Loop Chatbot server is running!");
});

// ✅ 5) Main chatbot route
app.post("/chatbot", async (req, res) => {
  const userMessage = req.body.message;
  console.log("Received message:", userMessage);

  // 🔑 For now: Fake reply. Replace with Gemini/LLM call later!
  const fakeReply = `You said: ${userMessage}`;

  res.json({ reply: fakeReply });
});

// ✅ 6) Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
