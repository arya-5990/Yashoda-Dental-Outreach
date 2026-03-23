import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Sale from './models/Sale.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (replace URI with actual one)
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ysp');

app.post('/api/log-sale', async (req, res) => {
  try {
    const { internPhone, customerPhone, audioUrl, screenshotUrl } = req.body;
    // const newSale = new Sale({ internPhone, customerPhone, audioUrl, screenshotUrl });
    // await newSale.save();
    
    res.status(201).json({ success: true, message: 'Sale logged successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/activity/:internPhone', async (req, res) => {
  try {
    // const activities = await Sale.find({ internPhone: req.params.internPhone }).sort({ createdAt: -1 }).limit(10);
    // Mocking response since DB might not be up:
    const activities = [
        { phone: '+91 98765 43210', status: 'verified', time: 'Today, 2:15 PM' },
    ];
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
