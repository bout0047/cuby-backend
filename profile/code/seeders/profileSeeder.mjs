import { pool } from '../db/index.js';

const seedData = [
  {
    "id": "1",
    "name": "Pete Davidson",
    "email": "Pete@bitches.com",
    "goals": ["pull up", "be charismatic", "get every baddie in the world"],
    "stats": {
      "clicks": "5",
      "stress": "37",
      "exercises": "3",
    },
    "interests": [
      { "id": "1", "name": "Football", "selected": "false" },
      { "id": "2", "name": "Basketball", "selected": "true" },
      { "id": "3", "name": "Draw", "selected": "true" },
      { "id": "4", "name": "Paint", "selected": "true" },
      { "id": "5", "name": "Game", "selected": "false" },
    ],
  },
  {
    "id": "2",
    "name": "Messi",
    "email": "Messi@dabest.com",
    "goals": ["score goals", "win awards", "train hard"],
    "stats": {
      "clicks": "5",
      "stress": "37",
      "exercises": "3",
    },
    "interests": [
      { "id": "1", "name": "Football", "selected": "true" },
      { "id": "2", "name": "Basketball", "selected": "true" },
      { "id": "3", "name": "Draw", "selected": "false" },
      { "id": "4", "name": "Paint", "selected": "true" },
      { "id": "5", "name": "Game", "selected": "false" },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS profile (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        goals VARCHAR(255)[],
        stats VARCHAR(255)[],
        interests VARCHAR(255)[]d
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
