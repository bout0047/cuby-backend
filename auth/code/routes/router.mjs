import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

import {
  createUser,
  authenticateUser
} from '../controllers/authController.mjs';

const router = express.Router();

// Google OAuth Configuration
const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
};

router.get('/auth/google', async (req, res) => {
  console.log('check1')
  const { clientId, redirectUri } = googleConfig;
  const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid profile email&prompt=consent`;
  res.json({ redirectUrl: authUrl });
});

router.get('/auth/callback', async (req, res) => {
  console.log('hello')
  const { code } = req.query;
  console.log(code);

  try {
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        code,
        client_id: googleConfig.clientId,
        client_secret: googleConfig.clientSecret,
        redirect_uri: googleConfig.redirectUri,
        grant_type: 'authorization_code',
      }
    );

    const googleAccessToken = tokenResponse.data.access_token;

    // Use the access token to get user info from Google
    const googleUserInfo = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    });
    
    console.log(googleUserInfo);

    const authToken = generateToken(existingUser || { googleId: googleUserInfo.data.id });
    console.log(authToken);
    // Return the token in the response
    res.json({ token: authToken, redirectUrl: '/home' });

  } catch (error) {
    console.error('Error exchanging code for token:', error.message);
    res.redirect('http://localhost:5173/home')
  }
});

// POST register user and generate token
router.post('/auth/register/', createUser);

// POST authenticate user and generate token
router.post('/auth/login/', authenticateUser);

export default router;
