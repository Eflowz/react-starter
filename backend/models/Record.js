const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  day: {
    type: String, // e.g., "Monday"
  },
  dateOnly: {
    type: String, // e.g., "2025-05-11"
  },
  weekStart: {
    type: String, // e.g., "2025-05-11"
  }
});

// Pre-save hook to compute day, dateOnly, and weekStart
recordSchema.pre('save', function (next) {
  const date = new Date(this.timestamp);

  const options = { weekday: 'long' };
  this.day = date.toLocaleDateString('en-US', options);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  this.dateOnly = `${yyyy}-${mm}-${dd}`;

  const dayOfWeek = date.getDay(); // Sunday = 0
  const weekStartDate = new Date(date);
  weekStartDate.setDate(date.getDate() - dayOfWeek);

  const wsY = weekStartDate.getFullYear();
  const wsM = String(weekStartDate.getMonth() + 1).padStart(2, '0');
  const wsD = String(weekStartDate.getDate()).padStart(2, '0');
  this.weekStart = `${wsY}-${wsM}-${wsD}`;

  next();
});

module.exports = mongoose.model('Record', recordSchema);
