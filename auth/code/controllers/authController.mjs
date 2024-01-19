import pool from '../db/index.js';
import User from '../models/User.mjs';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

//dotenv.config({ path: '../.env.development' });

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

const getUserByGoogleId = async (req, res) => {
  const { googleId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE googleId = $1', [googleId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = new User(result.rows[0]);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by Google ID:', error);
    res.status(500).json({ error: 'Internal server fetch error' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, password, googleId } = req.body;

    if (googleId) {
      // Google login, check if the user with google_id already exists
      const existingGoogleUser = await pool.query('SELECT * FROM users WHERE googleId = $1', [googleId]);

      if (existingGoogleUser.rows.length > 0) {
        return res.status(400).json({ error: 'User with Google ID already exists' });
      }

      // Create a new user entry using the Google ID
      const result = await pool.query('INSERT INTO users(googleId) VALUES($1) RETURNING *', [googleId]);
      const user = new User(result.rows[0]);
      return res.status(200).json({ user });
    }  

    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (existingUser.rows.length > 0) {
      // Username is already occupied
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user in the database
    const result = await pool.query('INSERT INTO users(username, password) VALUES($1, $2) RETURNING *', [username, hashedPassword]);

    const user = new User(result.rows[0]);
    res.set('X-User-ID', user.id);
    console.log('Newly made user: ', user);
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve user from the database
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Authentication failed. User not found.' });
    }

    const user = new User(result.rows[0]);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed. Incorrect password.' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getAllUsers, getUserByGoogleId, createUser, authenticateUser };
