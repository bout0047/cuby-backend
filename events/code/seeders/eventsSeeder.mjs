// db/seed.js
import { pool } from '../db/index.js';

const createTable = async () => {
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

    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

createTable();