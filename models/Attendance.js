const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    checkin: { type: Date, required: true },
    checkout: { type: Date },
    location: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String }, // Added description field
});

module.exports = mongoose.model('Attendance', attendanceSchema);
