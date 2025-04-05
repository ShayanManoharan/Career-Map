import { Request, Response } from 'express';
import { generateGeminiResponse } from '../services/geminiService';

export const handleChatMessage = async (req: Request, res: Response) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Generate response using Gemini
    const response = await generateGeminiResponse(message, context);

    // Return the response
    res.json({ response });
  } catch (error) {
    console.error('Error handling chat message:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}; 