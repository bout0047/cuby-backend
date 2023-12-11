import { pool } from '../db/index.js';

const seedData = [
  {
    "username": "user1",
    "password": "pass1"
  },
  {
    "username": "user2",
    "password": "pass2"
  },
];

const seedDatabase = async () => {
  try {
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        password VARCHAR(100)
      );
    `);

    // Seed the database with sample events
    for (const user of seedData) {
      await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2)',
        [user.username, user.password]
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
