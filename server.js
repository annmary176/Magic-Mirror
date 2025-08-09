// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use(express.static('Magic-Mirror'));
const genAI = new GoogleGenerativeAI("AIzaSyBH9rCXTslVYz6iOic9hGHYMkjSjW79u28");

app.get('/health', (req, res) => {
  res.json({ status: "OK" });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Magic-Mirror/mirror.html');
});

// Updated server.js with correct Gemini model name

app.post('/ask-gemini', async (req, res) => {
  const userInput = req.body.input;
  try {
    // Use the current model name instead of deprecated "gemini-pro"
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Alternative: "gemini-1.5-pro" for more advanced tasks
    
    const result = await model.generateContent(userInput);
    const response = result.response.text();
    res.json({ response });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
