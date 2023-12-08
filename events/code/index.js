import express from 'express';
import { pool } from './db/index.js';
import eventsRouter from './routes/events.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', eventsRouter);

const initDB = async () => {
  try {
    // Use the pool to check the connection
    await pool.query('SELECT 1');
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

// Initialize the database and start the server
initDB()
  .then(() => {
    // Use the eventsRouter after the database connection is established
    app.use('/', eventsRouter);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize the database:', error);
    process.exit(1); // Exit the process if the database connection fails
  });
