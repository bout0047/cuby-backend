import { pool } from '../db/index.js';

const seedData = [
  {
    datetime: '2023-12-01T10:00:00Z',
    name: 'Sample Event 1',
    description: 'Description of Event 1',
    location: 'Sample Location 1',
    link: 'https://example.com/event1',
  },
  {
    datetime: '2023-12-02T14:30:00Z',
    name: 'Sample Event 2',
    description: 'Description of Event 2',
    location: 'Sample Location 2',
    link: 'https://example.com/event2',
  },
  {
    datetime: '2023-12-03T18:45:00Z',
    name: 'Sample Event 3',
    description: 'Description of Event 3',
    location: 'Sample Location 3',
    link: 'https://example.com/event3',
  },
];

const seedDatabase = async () => {
  try {
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        datetime TIMESTAMP,
        name VARCHAR(255),
        description VARCHAR(255),
        location VARCHAR(255),
        link VARCHAR(255)
      );
    `);

    // Seed the database with sample events
    for (const event of seedData) {
      await pool.query(
        'INSERT INTO events (datetime, name, description, location, link) VALUES ($1, $2, $3, $4, $5)',
        [event.datetime, event.name, event.description, event.location, event.link]
      );
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection when done
    pool.end();
  }
};

// Call the seedDatabase function to seed the database
seedDatabase();
