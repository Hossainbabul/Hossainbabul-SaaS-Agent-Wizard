import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// Note: In a real environment, verify process.env.API_KEY is set.
// For this demo, we assume the environment is correctly configured.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const refineProjectDescription = async (
  rawDescription: string, 
  audience: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found. Returning mock response for demo.");
    return `(Mock Refinement - API Key missing)\n\nA high-performance SaaS platform designed for ${audience}. Features include:\n1. Advanced AI-driven analytics dashboard.\n2. Real-time collaboration tools.\n3. Automated reporting workflows.\n\nBased on: ${rawDescription}`;
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are an expert SaaS Product Manager. 
      Refine the following project idea into a professional, technical description suitable for an automated code generator.
      
      Project Idea: ${rawDescription}
      Target Audience: ${audience}
      
      Keep it concise (under 100 words) but technically specific. Highlight core features and tech stack implications.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Could not generate refinement.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI refinement service. Please proceed with original description.";
  }
};