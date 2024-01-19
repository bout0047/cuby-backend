import pool from '../db/index.js';
import CalendarEntry from '../models/CalendarEntry.mjs';

const getCalendarEntries = async (req, res) => {
  try {
    console.log("I want entries for user");
    const { userId } = req.body;
    const result = await pool.query('SELECT * FROM calendar_entries WHERE userId = $1', [userId]);
    const entries = result.rows.map((dbEntry) => new CalendarEntry(dbEntry));
    console.log(entries);
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching calendar entries:', error);
    res.status(500).json({ error: 'Internal server fetch error' });
  }
};

const createCalendarEntry = async (req, res) => {
  try {
    console.log("attempt");
    const { userId, eventId, datetime, name } = req.body;
    console.log(userId, eventId, datetime);

    let result;

    if (eventId) {
      result = await pool.query(
        'INSERT INTO calendar_entries (userId, eventId, datetime) VALUES ($1, $2, $3) RETURNING *',
        [userId, eventId, datetime],
      );
    } else if (name) {
      result = await pool.query(
        'INSERT INTO calendar_entries (userId, name, datetime) VALUES ($1, $2, $3) RETURNING *',
        [userId, name, datetime],
      );
    }

    const newEntry = result.rows[0];
    console.log(newEntry);
    res.json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateEntry = async (req, res) => {
  try {
    const { eventId, datetime } = req.body;
    const userId = req.headers.userid;

    const result = await pool.query(
      'UPDATE calendar_entries SET datetime = $1 WHERE eventId = $2 AND userId = $3 RETURNING *',
      [datetime, eventId, userId],
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
    const { eventId } = req.body;
    const userId = req.headers.userid;
    const result = await pool.query('SELECT * FROM calendar_entries WHERE userId = $1 AND eventId = $2', [userId, eventId]);
    console.log(result);
    await pool.query('DELETE FROM calendar_entries WHERE eventId = $1 AND userId = $2', [eventId, userId]);

    res.json({ message: 'Calendar entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export {
  getCalendarEntries, createCalendarEntry, updateEntry, deleteEntry,
};
