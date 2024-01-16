import express from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

const router = express.Router();

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

router.use(cookieParser());
router.use(sessionConfig);

const authenticate = (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  if (sessionId) {
    req.sessionStore.get(sessionId, (err, sessionData) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      if (sessionData && sessionData.userId) {
        req.userId = sessionData.userId;

        next(); 
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const authProxy = createProxyMiddleware({
  target: 'http://auth-ms:3013',
  changeOrigin: true,
  onProxyReq: fixRequestBody,
})
const eventProxy = createProxyMiddleware({
  target: 'http://events-ms:3010',
  changeOrigin: true,
  onProxyReq: fixRequestBody,
});

const calendarProxy = createProxyMiddleware({
  target: 'http://calendar-ms:3015',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    const userId = 223;
    proxyReq.setHeader('userid', userId);

    fixRequestBody(proxyReq, req, res);
  },
});

const profileProxy = createProxyMiddleware({
  target: 'http://profile-ms:3012',
  changeOrigin: true,
  onProxyReq: fixRequestBody,
});

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use(cors());

router.get('/redirect/:userId', (req, res) => {
  const { userId } = req.params;
  console.log('User ', userId);
  req.session.userId = userId;

  res.cookie('cubySession', req.sessionID);
  
  console.log('Sessionuser ', req.session.userId);
  res.redirect('http://localhost:5173/home');
});

router.use('/auth', cors(), authProxy);
router.use('/events', cors(), authenticate, eventProxy);
router.use('/profiles', cors(), authenticate, profileProxy);
router.use('/calendar', cors(), authenticate, calendarProxy);

export default router;
