import pg from 'pg';
import dotenv from 'dotenv';
import scrapeEvents from '../scraper.js';

const { Pool } = pg;

const createPool = () => {
  return new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT || 5432,
  });
};

let configFileName;

const environment = process.env.NODE_ENV || 'development';

switch (environment) {
  case 'production':
    configFileName = '.env.production';
    break;
  case 'test':
    configFileName = '.env.test';
    break;
  default:
    configFileName = '.env.development';
}

dotenv.config({ path: configFileName });

const pool = createPool();

// Function to create the "events" table in the database
const createEventsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      datetime TIMESTAMP NOT NULL,
      location VARCHAR(255) NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Events table created successfully');
  } catch (error) {
    console.error('Error creating events table:', error);
  }
};

// Function to seed the database with scraped events
const seedDatabase = async () => {
  try {
    // Create events table if not exists
    await createEventsTable();

    // Scrape events
    const scrapedEvents = await scrapeEvents();

    // Insert scraped events into the database
    for (const event of scrapedEvents) {
      const insertQuery = {
        text: 'INSERT INTO events (name, datetime, location) VALUES ($1, $2, $3) RETURNING *',
        values: [event.eventTitleScraped, event.eventDateScraped, event.eventPlaceScraped],
      };

      try {
        const result = await pool.query(insertQuery);
        const insertedEvent = result.rows[0];
        console.log(`Inserted event with ID ${insertedEvent.id}`);
      } catch (err) {
        console.error('Error inserting event into the database:', err);
      }
    }

    console.log('Database seeded successfully with scraped events');
  } catch (error) {
    console.error('Error seeding database:', error);
  } 
};

// Call the seedDatabase function to create and seed the database
seedDatabase();

export { pool }