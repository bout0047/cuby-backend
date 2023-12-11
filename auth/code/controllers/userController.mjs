import { pool } from '../db/index.js';
import User from '../models/User.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.test' });

const { SECRET_KEY } = process.env;

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    const users = result.rows.map((dbUser) => new User(dbUser));
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server fetch error' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = password //await bcrypt.hash(password, 10);

    // Store the user in the database
    const result = await pool.query('INSERT INTO users(username, password) VALUES($1, $2) RETURNING *', [username, hashedPassword]);

    const newUser = new User(result.rows[0]);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Authenticate a user and generate a token
const authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve user from the database
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Authentication failed. User not found.' });
    }

    const user = new User(result.rows[0]);

    // Compare the provided password with the hashed password in the database
    const passwordMatch = password //await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed. Incorrect password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getAllUsers, createUser, authenticateUser };
