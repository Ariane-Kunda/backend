// backend/src/routes/applicationRoutes.js
import express from 'express';
import { applyToJob, getUserApplications } from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, applyToJob);
router.get('/my-applications', protect, getUserApplications);

export default router;
