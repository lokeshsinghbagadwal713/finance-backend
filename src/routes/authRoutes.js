import express from 'express';
import { login } from '../controllers/authController.js';
import { validateBody } from '../middleware/validator.js';
import Joi from 'joi';

const router = express.Router();

const loginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });
router.post('/login', validateBody(loginSchema), login);

export default router;