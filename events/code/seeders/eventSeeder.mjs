import { pool } from '../db/index.js';

const seedData = [
  {
    "datetime": "2023-12-01T10:00:00Z",
    "name": "Tech Conference 2023",
    "description": "Join us for a cutting-edge technology conference featuring keynote speakers and interactive workshops.",
    "location": "Convention Center, CityName",
    "link": "https://techconference2023.com"
  },
  {
    "datetime": "2023-12-02T14:30:00Z",
    "name": "Art Exhibition: Modern Perspectives",
    "description": "Explore the works of contemporary artists pushing the boundaries of artistic expression.",
    "location": "Art Gallery, Downtown Arts District",
    "link": "https://artexhibition2023.com"
  },
  {
    "datetime": "2023-12-03T18:45:00Z",
    "name": "Global Health Symposium",
    "description": "A comprehensive discussion on global health challenges and innovative solutions with renowned experts.",
    "location": "Conference Hall, Medical University",
    "link": "https://globalhealthsymposium.org"
  },
  {
    "datetime": "2023-12-05T11:00:00Z",
    "name": "Startup Pitch Day",
    "description": "Witness exciting pitches from promising startups and connect with the next generation of entrepreneurs.",
    "location": "Innovation Hub, Tech Park",
    "link": "https://startuppitchday.com"
  },
  {
    "datetime": "2023-12-07T16:15:00Z",
    "name": "Culinary Delights Festival",
    "description": "Savor the flavors of local and international cuisines, with live cooking demonstrations and food tastings.",
    "location": "Food Festival Grounds, Waterfront",
    "link": "https://culinarydelightsfestival.com"
  },
  {
    "datetime": "2023-12-10T20:00:00Z",
    "name": "Jazz in the Park",
    "description": "Relax and enjoy an evening of jazz music in the beautiful surroundings of the city park.",
    "location": "City Park Amphitheater",
    "link": "https://jazzinthepark.com"
  },
];

const seedDatabase = async () => {
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

    // Seed the database with sample events
    for (const event of seedData) {
      await pool.query(
        'INSERT INTO events (datetime, name, description, location, link) VALUES ($1, $2, $3, $4, $5)',
        [event.datetime, event.name, event.description, event.location, event.link]
      );
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection when done
    pool.end();
  }
};

// Call the seedDatabase function to seed the database
seedDatabase();
