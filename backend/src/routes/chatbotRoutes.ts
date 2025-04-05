import express from 'express';
import { handleChatMessage } from '../controllers/chatbotController';

const router = express.Router();

// Chat endpoint
router.post('/chat', handleChatMessage);

export default router; 