import express from 'express';
import { register, updateProfile, generateFutureMap, getProfile } from '../controllers/userController';

const router = express.Router();

// Auth routes
router.post('/register', register);

// Profile routes
router.get('/profile/:userId', getProfile);
router.put('/profile/:userId', updateProfile);
router.post('/profile/:userId/generate-future-map', generateFutureMap);

export default router; 