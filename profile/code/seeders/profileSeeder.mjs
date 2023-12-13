import { pool } from '../db/index.js';

const seedData = [
  {
    "id": "1",
    "name": "Pete Davidson",
    "email": "Pete@bitches.com",
    "goals": ["pull up", "be charismatic", "get every baddie in the world"],
    "stats": [
      "clicks", "5",
      "stress", "37",
      "exercises","3",
    ],
    "interests": [
      [ "1", "name", "Football", "selected", "false" ],
      [ "2", "name", "Basketball", "selected", "true" ],
      [ "3", "name", "Draw", "selected", "false" ],
      [ "4", "name", "Paint", "selected", "true" ],
      [ "5", "name", "Game", "selected", "true" ],
    ],
  },
  {
    "id": "2",
    "name": "Rondaldo",
    "email": "Messi@dabest.com",
    "goals": ["score goals", "win awards", "train hard"],
    "stats": [
      "clicks", "5",
      "stress", "37",
      "exercises","3",
    ],
    "interests": [
      [ "1", "name", "Football", "selected", "true" ],
      [ "2", "name", "Basketball", "selected", "false"],
      [ "3", "name", "Draw", "selected", "false" ],
      [ "4", "name", "Paint", "selected", "false" ],
      [ "5", "name", "Game", "selected", "true" ],
    ],
  },
];

const seedDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS profile (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE not null,
        email VARCHAR(255) UNIQUE not null,
        goals text[],
        stats text [],
        interests text []
      );
    `);

    // Seed the database with sample profiles
    for (const profile of seedData) {
      await pool.query(
        'INSERT INTO profile (name, email, goals, stats, interests) VALUES ($1, $2, $3, $4, $5)',
        [profile.name, profile.email, profile.goals, profile.stats, profile.interests]
      );
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection when done
    await pool.end();
  }
};

// Call the seedDatabase function to seed the database
seedDatabase();
