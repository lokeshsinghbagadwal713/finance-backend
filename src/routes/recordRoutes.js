import express from 'express';
import { createRecord, getRecords, updateRecord, deleteRecord } from '../controllers/recordController.js';
import authorize from '../middleware/authorize.js';
import { validateBody } from '../middleware/validator.js';
import Joi from 'joi';

const router = express.Router();

const recordSchema = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().valid('INCOME','EXPENSE').required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
  note: Joi.string().allow('')
});

router.post('/', authorize('ADMIN','ANALYST'), validateBody(recordSchema), createRecord);
router.get('/', authorize('VIEWER','ANALYST','ADMIN'), getRecords);
router.patch('/:id', authorize('ADMIN'), updateRecord);
router.delete('/:id', authorize('ADMIN'), deleteRecord);

export default router;