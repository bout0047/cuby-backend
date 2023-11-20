import express from 'express';
import cors from 'cors';
import {
  getEvents,
  getEventsForAYear,
  getEventsForAYearAndMonth,
  getEventsForAYearAndMonthAndADay,
  setEventsForAYearAndMonthAndADay,
} from '../controllers/eventsController.js';

const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('hi');
});

router.options('/events', (req, res, next) => {
  try {
    //set header before response
    res.header({
      allow: 'GET, POST, OPTIONS',
      'Content-type': 'application/json',
      Data: Date.now(),
      'Content-length': 0,
    });
    //response
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

// get a collection of all the events and you can use a query
router.get('/events', cors(), getEvents);
router.get('/events/:year', cors(), getEventsForAYear);
router.get('/events/:year/:month', cors(), getEventsForAYearAndMonth);
router.get('/events/:year/:month/:day', cors(), getEventsForAYearAndMonthAndADay);
router.post('/events/:year/:month/:day', cors(), setEventsForAYearAndMonthAndADay);

export default router;
