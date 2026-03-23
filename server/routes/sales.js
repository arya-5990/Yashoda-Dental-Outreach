import express from 'express';
import Sale from '../models/Sale.js';

const router = express.Router();

// Get specific intern's activity log and sales count
router.get('/:internId', async (req, res) => {
  try {
    const { internId } = req.params;
    
    // Fetch all sales by this intern
    const sales = await Sale.find({ internRef: internId }).sort({ createdAt: -1 });
    
    // Map to activity format for frontend
    const activities = sales.map(s => ({
      id: s._id,
      phone: s.customerPhone,
      status: s.status,
      time: new Date(s.createdAt).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }));

    // Approved sales count (Verified only, or maybe all during review? Let's say all verified count towards tier, or review + verified. Usually 'approved' means verified)
    const approvedSalesCount = sales.filter(s => s.status === 'verified').length;
    // For demo purposes, let's treat "review" as well, or just actual verified
    const totalSalesSubmitted = sales.length;

    res.json({ activities, totalSalesSubmitted, currentSales: approvedSalesCount });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Submit a new sale
router.post('/log-sale', async (req, res) => {
  try {
    const { internRef, customerPhone, audioUrl, screenshotUrl } = req.body;
    
    const newSale = new Sale({
      internRef,
      customerPhone,
      audioUrl,
      screenshotUrl,
      status: 'review' // default status for new submissions
    });

    await newSale.save();
    
    res.status(201).json({ success: true, message: 'Sale logged successfully', sale: newSale });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

export default router;
