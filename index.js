import express from "express";
import bodyParser from "body-parser";
// If you use Gemini, adjust this accordingly
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

// ✅ TEST: Home route
app.get("/", (req, res) => {
  res.send("✅ Campus Loop Chatbot server is running!");
});

// ✅ MAIN: /chatbot route
app.post("/chatbot", async (req, res) => {
  const userMessage = req.body.message;

  console.log("Received message:", userMessage);

  // 🔑 Replace this with your real Gemini/OpenAI logic later
  const fakeReply = `You said: ${userMessage}`;

  res.json({ reply: fakeReply });
});

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
