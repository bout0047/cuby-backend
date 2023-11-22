import express from 'express';
import cors from 'cors';
import eventsRouter from './routes/eventRoutes.js';

const app = express();
const PORT = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', (req, res) => {
  res.json('hi');
});

app.use('/events', eventsRouter);

app.listen(PORT, () => {
  console.log(`Events is running on port ${PORT}`);
});
