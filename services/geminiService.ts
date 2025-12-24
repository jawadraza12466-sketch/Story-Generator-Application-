import { GoogleGenAI } from "@google/genai";
import { StoryParams } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStoryFromAI = async (params: StoryParams): Promise<string> => {
  const { title, genre, characters, length, language } = params;

  const prompt = `
    You are a master storyteller. Write a unique, creative, and engaging story based on the following constraints:
    
    1. **Title**: ${title ? title : 'Create a catchy title relevant to the plot'}
    2. **Genre**: ${genre}
    3. **Main Characters**: ${characters}
    4. **Length**: ${length}
    5. **Language**: ${language}
    
    **Story Requirements**:
    - Ensure it has a strong beginning, a compelling middle, and a satisfying ending.
    - Maintain clear plot structure and emotional flow.
    - Ensure content is age-appropriate (safe for general audiences).
    - NO plagiarism.
    - Use creative dialogues and vivid descriptions.
    
    **Output Format**:
    Please return the response in the following format (plain text):
    
    [TITLE]
    
    [STORY CONTENT]
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8, // Slightly creative
        topK: 40,
        topP: 0.95,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No story was generated. Please try again.");
    }
    return text;
  } catch (error) {
    console.error("Error generating story:", error);
    throw error;
  }
};
