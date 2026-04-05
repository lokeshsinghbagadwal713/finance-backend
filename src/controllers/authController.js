import db from '../models/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });
    if(!user) return res.status(404).json({ error: 'User not found' });

    const valid = await user.validatePassword(password);
    if(!valid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  } catch(err) { next(err); }
};