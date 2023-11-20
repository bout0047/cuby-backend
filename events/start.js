// events.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Route to get all events
app.get('/events', (req, res) => {
  db.all('SELECT * FROM events', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Route to add a new event
app.post('/events', (req, res) => {
  const { name, description, location, date, time, duration, link } = req.body;

  const stmt = db.prepare(`
    INSERT INTO events (name, description, location, date, time, duration, link)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.bind(name, description, location, date, time, duration, link);
  
  stmt.run(function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      eventid: this.lastID,
      name,
      description,
      location,
      date,
      time,
      duration,
      link
    });
  });

  stmt.finalize();
});

// Start the server
app.listen(port, () => {
  console.log(`Events microservice is running on http://localhost:${port}`);
});
