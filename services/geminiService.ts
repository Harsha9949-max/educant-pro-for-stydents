
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A check to ensure API_KEY is set, though the prompt guarantees it will be.
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getAiResponse = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key not configured. Please check your setup.";
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert tutor for a high school student. Explain concepts clearly, concisely, and with helpful examples. Be encouraging and supportive.",
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while contacting the AI Study Buddy: ${error.message}`;
    }
    return "An unknown error occurred while contacting the AI Study Buddy.";
  }
};
