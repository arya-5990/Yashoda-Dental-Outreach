import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register new intern
router.post('/register', async (req, res) => {
  try {
    const { method, contact, password, name, email, phone, aadharId, dob, address, college, idCardUrl, profileUrl, termsAccepted } = req.body;
    
    if (!contact || !password || !name) {
      return res.status(400).json({ error: 'Please provide name, contact, and password.' });
    }

    // Check if user exists
    let user = await User.findOne({ contact });
    if (user) {
      return res.status(400).json({ error: 'User already exists with this contact.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user = new User({ 
      method, contact, password: hashedPassword, name, 
      email, phone, aadharId, dob, address, college, 
      idCardUrl, profileUrl, termsAccepted 
    });
    await user.save();

    // Create JWT
    const payload = { id: user._id, contact: user.contact };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user._id, contact: user.contact, name: user.name } });
  } catch (err) {
    console.error(err.message, err.stack);
    res.status(500).json({ error: 'Server Error', details: err.message, stack: err.stack });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { contact, password } = req.body;
    
    if (!contact || !password) {
      return res.status(400).json({ error: 'Please provide contact and password.' });
    }

    let user = await User.findOne({ contact });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials. Wrong password.' });
    }

    const payload = { id: user._id, contact: user.contact };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, contact: user.contact, name: user.name } });
  } catch (err) {
    console.error(err.message, err.stack);
    res.status(500).json({ error: 'Server Error', details: err.message, stack: err.stack });
  }
});

export default router;
