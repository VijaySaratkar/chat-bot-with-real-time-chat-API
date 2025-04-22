import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/users → list all users
router.get('/', protect, getAllUsers);

export default router;
