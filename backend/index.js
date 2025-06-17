const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const Visitor = require('./models/Visitor');
const recordsRoutes = require('./routes/records');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// app.get('/api', recordsRoutes); //we will use the.use to test if the backend is working
app.use('/api', recordsRoutes);
app.use('/api', authRoutes);



app.post('/api/submit', async (req, res) => {
  const { fullName, timestamp } = req.body;

  if (!fullName || !timestamp) {
    return res.status(400).json({ error: 'Missing fullName or timestamp' });
  }

  try {
    const dateObj = new Date(timestamp);

    const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const dateOnly = dateObj.toISOString().split('T')[0];

    const dayOfWeek = dateObj.getDay();
    const sundayDate = new Date(dateObj);
    sundayDate.setDate(dateObj.getDate() - dayOfWeek);
    const weekStart = sundayDate.toISOString().split('T')[0];

    const newVisitor = new Visitor({ fullName, timestamp: dateObj, day, dateOnly, weekStart });
    await newVisitor.save();

    console.log(`✔ Saved: ${fullName} at ${timestamp}`);
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('❌ Save error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// GET weekly attendance
app.get('/api/attendance/week', async (req, res) => {
  const { weekStart } = req.query;

  if (!weekStart) {
    return res.status(400).json({ error: 'Missing weekStart query parameter' });
  }

  try {
    // Normalize dates
    const start = new Date(weekStart);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Include up to Saturday
    end.setHours(23, 59, 59, 999); // Ensure end covers full last day

    // Fetch all visitors within the selected week
    const records = await Visitor.find({
      timestamp: {
        $gte: start,
        $lte: end
      }
    }).sort({ timestamp: 1 });

    // Group by date
    const grouped = {};
    records.forEach((record) => {
      const ts = new Date(record.timestamp);
      const dateOnly = ts.toISOString().split('T')[0];
      const day = ts.toLocaleDateString('en-US', { weekday: 'long' });
      const timeString = ts.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      if (!grouped[dateOnly]) {
        grouped[dateOnly] = {
          day,
          date: dateOnly,
          count: 0,
          entries: []
        };
      }

      grouped[dateOnly].count += 1;
      grouped[dateOnly].entries.push({
        name: record.fullName,
        time: timeString
      });
    });

    const result = Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({
      week: `${weekStart} - ${end.toISOString().split('T')[0]}`,
      totalSignIns: records.length,
      days: result
    });
  } catch (error) {
    console.error('❌ Error fetching weekly attendance:', error);
    res.status(500).json({ error: 'Server error while fetching attendance data' });
  }
});




app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
