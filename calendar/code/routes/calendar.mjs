import express from 'express';
import {
  getCalendarEntries,
  createCalendarEntry,
  updateEntry,
  deleteEntry,
} from '../controllers/calendarController.mjs';

const router = express.Router();

router.get('/calendar/', getCalendarEntries);
router.post('/calendar/', createCalendarEntry);
router.put('/calendar/', updateEntry);
router.delete('/calendar/', deleteEntry);
router.get('/calendar/:id', getCalendarEntries);

export default router;
