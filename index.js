import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// POST route for chatbot
app.post("/chatbot", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "No message provided." });
  }

  try {
    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [{ parts: [{ text: userMessage }] }]
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          key: "AIzaSyD6w_ISf7F19kWV4dVSEluKllz0YO-5DuQ"
        }
      }
    );

    const aiText =
      geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t find an answer.";

    res.json({ reply: aiText });
  } catch (error) {
    console.error("🔥 Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
