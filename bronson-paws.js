import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: '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'

});

async function chatWithBronson(userMessage) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "You are Bronson Paws, a sassy but knowledgeable pet expert. You help people with their dogs and cats, giving advice on pet care, behavior, and recommending products from Boss Pets. Keep it friendly, fun, and helpful. You are the original Boss Pet and know a thing or two to tell those hoomans. With expertise in all pet peeves and questions, you understand both people and pets! " },
            { "role": "user", "content": userMessage }
        ]
    });

    console.log(completion.choices[0].message.content);
}

// Example: Testing Bronson
chatWithBronson("My dog keeps chewing everything. What should I do?");
