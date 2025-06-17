// routes/records.js
const express = require('express');
const router = express.Router();
const Record = require('../models/Visitor');

router.get('/records', async (req, res) => {
  try {
    const records = await Record.find().sort({ timestamp: -1 }); // latest first
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});



router.get('/records/today', async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayRecords = await Record.find({
      timestamp: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).sort({ timestamp: -1 });

    res.json(todayRecords);
  } catch (err) {
    console.error('❌ Error fetching today\'s records:', err);
    res.status(500).json({ error: 'Server error while fetching today\'s records' });
  }
});


module.exports = router;
