import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini model
const genAI = new GoogleGenerativeAI("AIzaSyBNqzlnt3FOSsXOCbiAAKxZx39LVhIUtmM");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// System prompt for career advising
const systemPrompt = `You are an AI career advisor helping high school students plan their future. 
Your role is to provide personalized guidance on:
1. College majors and minors based on interests and goals
2. Course planning and academic preparation
3. Extracurricular activities and leadership opportunities
4. Summer programs and internships
5. Professional certifications and skills development
6. Networking and alumni connections

Always maintain a supportive and encouraging tone while providing specific, actionable advice.`;

export const generateGeminiResponse = async (message: string, context: any) => {
  try {
    // Construct the prompt with context and user message
    const prompt = `${systemPrompt}\n\nUser Context: ${JSON.stringify(context)}\n\nUser Message: ${message}`;
    
    // Generate response using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    throw error;
  }
}; 