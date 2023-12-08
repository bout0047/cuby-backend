// Seeder without using knex
import { pool } from '../db/index.js';

// Define seed contents
const seedData = [
  {
    name: 'Sample 1',
  },
  {
    name: 'Sample 2',
  },
];

const seedDatabase = async () => {
  try {
    // Define table to be created if it does not exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS templates (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255)
      );
    `);

    // Seed the database with seed data
    for (const template of seedData) {
      await pool.query(
        'INSERT INTO templates (name) VALUES ($1)',
        [template.name]
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
