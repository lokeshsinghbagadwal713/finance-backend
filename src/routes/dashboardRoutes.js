import express from 'express';
import { getSummary } from '../controllers/dashboardController.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();
router.get('/summary', authorize('ANALYST','ADMIN'), getSummary);

export default router;