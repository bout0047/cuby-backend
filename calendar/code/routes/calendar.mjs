import express from 'express';
import {
  getCalendarEntries,
  createCalendarEntry,
  updateEntry,
  deleteEntry
} from '../controllers/eventsController.mjs';

const router = express.Router();

router.get('/calendar/', getCalendarEntries);
router.post('/calendar/:id', createCalendarEntry);
router.put('/calendar/:id', updateEntry);
router.delete('/calendar/:id', deleteEntry);

export default router;
