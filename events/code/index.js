import express from 'express';
import { pool } from './db/index.js';
import eventsRouter from './routes/events.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', eventsRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
