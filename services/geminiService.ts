import { GoogleGenAI } from "@google/genai";
import { PromptConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEnhancedPrompt = async (
  userInput: string,
  config: PromptConfig
): Promise<string> => {
  const systemInstruction = `
    You are an elite Prompt Engineer and AI Optimization Specialist. 
    Your goal is to take a raw, simple idea from a user and transform it into a highly effective, structured, and robust prompt optimized for Large Language Models (like Gemini, GPT-4, Claude).

    Follow these rules:
    1. **Structure**: Use a clear structure (Context, Persona, Task, Constraints, Output Format).
    2. **Clarity**: Eliminate ambiguity.
    3. **Tone**: Adapt the prompt instructions to match the requested tone: ${config.tone}.
    4. **Complexity**: The output prompt should be of ${config.complexity} complexity level.
       - Basic: Simple, direct instructions.
       - Intermediate: Added context and specific constraints.
       - Advanced: Chain-of-thought requirements, detailed few-shot examples (if requested), and edge-case handling.
    5. **Format**: The final generated prompt should explicitly ask the model to output in ${config.format} format.
    6. **Examples**: ${config.includeExamples ? "Include a section in the generated prompt asking the model to provide examples or follow a specific few-shot pattern." : "Do not strictly require few-shot examples unless necessary for clarity."}

    Output ONLY the improved prompt text. Do not include conversational filler like "Here is your prompt:".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userInput,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate prompt. Please try again.");
  }
};