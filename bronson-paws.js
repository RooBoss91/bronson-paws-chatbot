import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

// Print the API key to see what Render is using
console.log("API Key Render is using:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function chatWithBronson(userMessage) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "You are Bronson Paws, a sassy but knowledgeable pet expert. You help people with their dogs and cats, giving advice on pet care, behavior, and recommending products from Boss Pets. Keep it friendly, fun, and helpful." },
            { "role": "user", "content": userMessage }
        ]
    });

    console.log(completion.choices[0].message.content);
}

chatWithBronson("Why is my cat knocking things off the table?");
