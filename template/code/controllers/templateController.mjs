import { pool } from '../db/index.js';
//Import the necesary models here
import Template from '../models/Template.js';

//Define the controller methods here
const getAllTemplates = async (req, res) => {
  try {
    // Use the desired table name in place of "templates"
    const result = await pool.query('SELECT * FROM templates');
    const events = result.rows.map((dbEvent) => new Template(dbEvent));
    res.json(events);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Internal server fetch error' });
  }
};

//Export the controller methods
export {};
