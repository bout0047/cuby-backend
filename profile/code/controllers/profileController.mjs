import pool from '../db/index.js';
import Profile from '../models/Profile.mjs'; 

const getAllProfiles = async (req, res) => {
  try {
    console.log("reached get all profiles");
    const result = await pool.query('SELECT * FROM profile');
    const profiles = result.rows.map((dbProfile) => new Profile(dbProfile));
    res.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Internal server fetch error' });
  }
};

const getProfileById = async (req, res) => {
  const { userId } = req.body;

  try {
    const result = await pool.query('SELECT * FROM profile WHERE userId = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const profile = new Profile(result.rows[0]);
    console.log(profile, "profile");
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createProfile = async (req, res) => {
  console.log("we are herre");
  const { userId, name, email, goals, stats, interests } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO profile (userId, name, email, goals, stats, interests) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, name, email, goals, stats, interests]
    );

    const newProfile = new Profile(result.rows[0]);
    console.log("newProfile", newProfile);
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  console.log(req.body);
  const profileId = req.params.id;
  const { name, email, goals, stats, interests } = req.body;
  console.log(name, email, goals, stats, interests);

  try {
    const result = await pool.query(
      'UPDATE profile SET name = $1, email = $2, goals = $3, stats = $4, interests = $5 WHERE id = $6 RETURNING *',
      [name, email, goals, stats, interests, profileId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const updatedProfile = new Profile(result.rows[0]);
    res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProfile = async (req, res) => {
  const profileId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM profile WHERE id = $1 RETURNING *', [profileId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getAllProfiles, getProfileById, createProfile, updateProfile, deleteProfile };
