import pool from '../db/index.js';
import Event from '../models/Event.mjs';

const getAllEvents = async (req, res) => {
  try {
    // Assuming the pool is initialized globally and available in ../db/index.js
    const result = await pool.query('SELECT * FROM events');
    const events = result.rows.map((dbEvent) => new Event(dbEvent));
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server fetch error' });
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
  try {
    // Scrape events
    const scrapedEvents = await scrapeEvents();

    // Insert scraped events into the database
    for (const event of scrapedEvents) {
      const query = {
        text: 'INSERT INTO events (name, datetime, location, description) VALUES ($1, $2, $3, $4)',
        values: [event.eventTitleScraped, event.eventDateScraped, event.eventPlaceScraped, event.eventDescription],
      };

      try {
        await pool.query(query);
        console.log(`Inserted row with id`);
      } catch (err) {
        console.error('Error inserting event into the database:', err);
      }
    }

    res.status(201).json({ message: 'Scraped events inserted successfully' });
  } catch (error) {
    console.error('Error scraping and inserting events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const { datetime, name, location, link } = req.body;

  try {
    const result = await pool.query(
      'UPDATE events SET datetime = $1, name = $2, description = $3, location = $4, link = $5 WHERE id = $6 RETURNING *',
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
