import express from 'express';
import pool from './db/index';
import calendarRouter from './routes/calendar';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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
    // Use the calendarRouter after the database connection is established
    app.use('/', calendarRouter);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize the database:', error);
    process.exit(1); // Exit the process if the database connection fails
  });
