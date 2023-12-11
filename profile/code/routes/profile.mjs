import express from 'express';
import {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
} from '../controllers/profileController.mjs'; 

const router = express.Router();

router.get('/profiles/', getAllProfiles);
router.get('/profiles/:id', getProfileById);
router.post('/profiles/', createProfile);
router.put('/profiles/:id', updateProfile);
router.delete('/profiles/:id', deleteProfile);

export default router;
