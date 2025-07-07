import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

// ✅ Use CORS with explicit origin for security
app.use(cors({
  origin: ["https://campus-loop-e722a.web.app"], // your hosted Firebase site!
  methods: ["GET", "POST"],
  credentials: false
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("✅ Campus Loop Chatbot server is running!");
});

app.post("/chatbot", (req, res) => {
  const userMessage = req.body.message;
  console.log("Received message:", userMessage);
  res.json({ reply: `You said: ${userMessage}` });
});

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
