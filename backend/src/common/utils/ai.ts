import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generatePostSummary = async (content: string) => {
    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `
            You are an AI assistant that summarizes social media posts.
            Summarize the following post in 2-3 sentences.
            Keep the important information.
            Do not add information that isn't present.

            Post: ${content}
            `
    })

    return response.text;
}