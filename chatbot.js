const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function runChat(userInput) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are a helpful assistant for a Java study tool." }]
        },
        {
          role: "model",
          parts: [{ text: "Understood. How can I help you with Java today?" }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(userInput);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error in runChat:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
}

module.exports = { runChat };