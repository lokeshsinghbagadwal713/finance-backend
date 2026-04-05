import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// -----------------
// DB SETUP (uses .env credentials)
// -----------------
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,  // Use DB_PORT from .env or default 3306
    dialect: 'mysql',
    logging: false,
  }
);

// Sample User model
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

// -----------------
// Middleware (auth placeholder)
// -----------------
const authMiddleware = (req, res, next) => {
  // simple auth check example
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  next();
};

// -----------------
// Routes
// -----------------

// Public route
app.get('/auth/test', (req, res) => {
  res.json({ message: 'Auth route working ✅' });
});

// Protected route
app.use(authMiddleware);

app.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// -----------------
// Start server
// -----------------
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('DB connected ✅');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection failed:', err));