import express from 'express';
import {
  getAllUsers,
  createUser,
  authenticateUser
} from '../controllers/userController.mjs';

const router = express.Router();

// GET all users
router.get('/users/', getAllUsers);

// POST create a new user
router.post('/register/', createUser);

// POST authenticate user and generate token
router.post('/login/', authenticateUser);

export default router;
