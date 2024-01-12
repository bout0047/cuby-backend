import { pool } from '../db/index.js';
import CalendarEntry from '../models/CalendarEntry.mjs';

const getCalendarEntries = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const result = await pool.query('SELECT * FROM calendar_entries WHERE user_id = $1', [userId]);
    const entries = result.rows.map((dbEntry) => new CalendarEntry(dbEntry));
    res.json(entries);
  } catch (error) {
    console.error('Error fetching calendar entries:', error);
    res.status(500).json({ error: 'Internal server fetch error' });
  }
};

const createCalendarEntry = async (req, res) => {
  try {
    const { id, datetime } = req.body;
    const userId = req.headers.userid;

    const result = await pool.query(
      'INSERT INTO calendar_entries (id, user_id, event_id, datetime) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, userId, req.params.id, datetime]
    );

    const newEntry = result.rows[0];
    res.json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { datetime } = req.body;
    const userId = req.headers.userid;

    const result = await pool.query(
      'UPDATE calendar_entries SET datetime = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [datetime, id, userId]
    );

    const updatedEntry = result.rows[0];

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Calendar entry not found' });
    }

    res.json(updatedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.userid;

    await pool.query('DELETE FROM calendar_entries WHERE id = $1 AND user_id = $2', [id, userId]);

    res.json({ message: 'Calendar entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getCalendarEntries, createCalendarEntry, updateEntry, deleteEntry}