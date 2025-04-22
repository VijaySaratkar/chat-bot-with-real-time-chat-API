import express from 'express';
import { getMessages, sendMessage } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET  /api/chat?to=<userId>    → fetch conversation
router.get('/', protect, getMessages);

// POST /api/chat                 → send message
router.post('/', protect, sendMessage);

export default router;
