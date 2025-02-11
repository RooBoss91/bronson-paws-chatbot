// Import required modules
import OpenAI from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // ✅ Move CORS import to the top
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'YOUR_DEFAULT_API_KEY'
});

// Initialize Express app
const app = express();
app.use(cors()); // ✅ Enable CORS globally
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Root endpoint for health check
app.get('/', (req, res) => {
  res.send('Bronson Paws is running!');
});

// ✅ Endpoint to handle chat requests
app.post('/chat', async (req, res) => {
  const userInput = req.body.message;

  if (!userInput) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are Bronson Paws, a fun, sassy pet expert giving expert pet advice and linking to products and blogs from Boss Pets.' },
        { role: 'user', content: userInput }
      ]
    });

    // ✅ Safe handling of AI response
    const aiReply = response?.choices?.[0]?.message?.content || "Sorry, I couldn't process your request.";

    res.json({ reply: aiReply });
  } catch (error) {
    console.error('❌ OpenAI API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'An error occurred while processing your request. Please try again later.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

  
