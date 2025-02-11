// Import required modules
import OpenAI from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to handle chat requests
app.post('/chat', async (req, res) => {
  const userInput = req.body.message;

  if (!userInput) {
    return res.status(400).send({ error: 'Message is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are Bronson Paws, a helpful assistant for pet care and product recommendations.' },
        { role: 'user', content: userInput }
      ]
    });

    res.send({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'An error occurred while processing your request.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
