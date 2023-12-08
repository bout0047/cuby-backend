import express from 'express';
import { pool } from './db/index.js';
// Import the necessary routers
import templateRouter from './routes/router.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Enable the imported routers
app.use('/', templateRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
