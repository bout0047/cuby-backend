import { pool } from '../db/index.js';

const seedData = [
  {
    "id": "0",
    "name": "Pete Davidson",
    "email": "Pete@bitches.com",
    "goals": [
      ["eye contact", "small talk", "body language"],
      ["stranger conversation", "random event", "presentation"],
      ["meditation", "breathing excersise", "friend support"],
    ],
    "stats": [
      "clicks", "5",
      "stress", "37",
      "exercises", "3",
    ],
    "interests": [
      ["0", "Football", "true"],
      ["1", "Basketball", "false"],
      ["2", "Reading", "false"],
      ["3", "Painting", "false"],
      ["4", "Hiking", "true"],
      ["5", "Games", "true"],
      ["6", "Drawing", "true"],
      ["7", "Cooking", "true"],
      ["8", "Yoga", "true"],
      ["9", "Writing", "true"],
      ["10", "Music", "true"],
      ["11", "Puzzle", "true"],
    ],
  },
  {
    "id": "1",
    "name": "Rondaldo",
    "email": "Messi@dabest.com",
    "goals": [
      ["eye contact", "small talk", "body language"],
      ["stranger conversation", "random event", "presentation"],
      ["meditation", "breathing excersise", "friend support"],
    ],
    "stats": [
      "clicks", "5",
      "stress", "37",
      "exercises", "3",
    ],
    "interests": [
      ["0", "Football", "true"],
      ["1", "Basketball", "false"],
      ["2", "Reading", "false"],
      ["3", "Painting", "false"],
      ["4", "Hiking", "true"],
      ["5", "Games", "true"],
      ["6", "Drawing", "true"],
      ["7", "Cooking", "true"],
      ["8", "Yoga", "true"],
      ["9", "Writing", "true"],
      ["10", "Music", "true"],
      ["11", "Puzzle", "true"],
    ],
  },
];

const seedDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS profile (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) not null,
        email VARCHAR(255),
        goals text[],
        stats text[],
        interests text[]
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
