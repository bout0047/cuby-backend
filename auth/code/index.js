import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { pool } from './db/index.js';
import userRouter from './routes/router.mjs';
import dotenv from 'dotenv';

//dotenv.config({ path: '../.env.development' });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(session({ 
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(cors());

app.use('/', userRouter);

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
    app.use('/', userRouter);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize the database:', error);
    process.exit(1); // Exit the process if the database connection fails
  });
