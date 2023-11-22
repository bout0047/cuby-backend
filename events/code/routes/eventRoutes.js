import express from 'express';
import cors from 'cors';
import { getEvents, createEvent } from '../controllers/eventsController.js';

const router = express.Router();

// Options route for CORS preflight requests
router.options('/', (req, res, next) => {
  try {
    res.header({
      allow: 'GET, POST, OPTIONS',
      'Content-type': 'application/json',
      Data: Date.now(),
      'Content-length': 0,
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

// Event routes
router.get('/events', cors(), getEvents);
router.post('/events', cors(), createEvent);

export default router;
