// backend/src/routes/jobRoutes.js
import express from 'express';
import { createJob, getJobs, updateJob, deleteJob } from '../controllers/jobController.js';
import { protect, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getJobs);
router.post('/', protect, authorizeAdmin, createJob);
router.put('/:id', protect, authorizeAdmin, updateJob);
router.delete('/:id', protect, authorizeAdmin, deleteJob);

export default router;
