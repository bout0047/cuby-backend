import { pool } from '../db/index.js';
import Event from '../models/Event.mjs';

const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    const events = result.rows.map((dbEvent) => new Event(dbEvent));
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getEventById = async (req, res) => {
  const eventId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [eventId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = new Event(result.rows[0]);
    res.json(event);
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createEvent = async (req, res) => {
  const { datetime, name, location, link } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO events (datetime, name, location, link) VALUES ($1, $2, $3, $4) RETURNING *',
      [datetime, name, location, link]
    );

    const newEvent = new Event(result.rows[0]);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const { datetime, name, location, link } = req.body;

  try {
    const result = await pool.query(
      'UPDATE events SET datetime = $1, name = $2, location = $3, link = $4 WHERE id = $5 RETURNING *',
      [datetime, name, location, link, eventId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const updatedEvent = new Event(result.rows[0]);
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [eventId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
