import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

import { pool } from '../db/index.js';

import {
  createUser,
  authenticateUser
} from '../controllers/authController.mjs';

//dotenv.config({ path: '../.env.development' });

const router = express.Router();

// POST create a new user

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3013/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Happy Google Start', profile.id);
    // Check if the user exists in your database based on profile.id or other unique identifier
    let user = await pool.query('SELECT * FROM users WHERE googleId = $1', [profile.id]);

    if (user.rows.length === 0) {
      // User not found, create a new user entry
      // Insert the user into the database using profile information
      const newUserResult = await pool.query('INSERT INTO users(googleId, username) VALUES($1, $2) RETURNING *', [profile.id, profile.displayName]);
      user = newUserResult.rows[0];
    }

    // Call done(null, user) with the user object
    done(null, user);
  } catch (error) {
    console.error('Error during Google authentication:', error);
    done(error, null);
  }
}));

// Google login route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback route
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to the home page or generate a JWT token
    console.log('Happy Google End')
    res.redirect('/');
  }
);

// POST register user and generate token
router.post('/register/', createUser);

// POST authenticate user and generate token
router.post('/login/', authenticateUser);

router.use(session({
  secret: process.env.SECRET_KEY, // Same secret key as in index.js
  resave: false,
  saveUninitialized: true,
}));

export default router;
