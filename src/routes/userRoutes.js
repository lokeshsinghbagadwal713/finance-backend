import express from 'express';
import { createUser, getUsers, updateUser } from '../controllers/userController.js';
import authorize from '../middleware/authorize.js';
import { validateBody } from '../middleware/validator.js';
import Joi from 'joi';

const router = express.Router();

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('VIEWER','ANALYST','ADMIN')
});

router.post('/', authorize('ADMIN'), validateBody(userSchema), createUser);
router.get('/', authorize('ADMIN','ANALYST'), getUsers);
router.patch('/:id', authorize('ADMIN'), updateUser);

export default router;  