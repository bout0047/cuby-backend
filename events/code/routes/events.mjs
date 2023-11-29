import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventsController.mjs';

const router = express.Router();

router.get('/events/', getAllEvents);
router.get('/events/:id', getEventById);
router.post('/events/', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

export default router;
