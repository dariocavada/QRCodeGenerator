
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function fetchPageTitle(url: string): Promise<string> {
  try {
    const prompt = `Extract the exact content of the <title> tag from the webpage at the URL: ${url}. Respond with only the text content of the title tag and absolutely nothing else. If you cannot access the URL or find a title, respond with "Title not found".`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const title = response.text.trim();

    if (!title || title === "Title not found") {
      // Fallback if AI can't find a title
      try {
        const urlObject = new URL(url);
        return urlObject.hostname; // Use hostname as a decent fallback
      } catch {
        return "Untitled Page";
      }
    }

    return title;
  } catch (error) {
    console.error("Error fetching page title with Gemini:", error);
    // Fallback in case of API error
    try {
      const urlObject = new URL(url);
      return urlObject.hostname;
    } catch {
      return "Untitled Page";
    }
  }
}
