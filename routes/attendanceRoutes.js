const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/roleMiddleware');
const {
    takeAttendance,
    getAllAttendance,
    getUserAttendance,
    updateAttendance,
    deleteAttendance
} = require('../controllers/attendanceController');

// Mark attendance
router.post('/mark', protect, takeAttendance);

// Get all attendance records (Admin-only)
router.get('/', protect, adminOnly, getAllAttendance);

// Get specific user attendance
router.get('/:userId', protect, getUserAttendance);

// Update attendance record
router.put('/:id', protect, adminOnly, updateAttendance);

// Delete attendance record
router.delete('/:id', protect, adminOnly, deleteAttendance);

module.exports = router;
