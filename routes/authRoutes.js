const express = require('express');
const { registerUser, loginUser, logout, updateUser, deleteUser, getAllUsers, getUserById } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/roleMiddleware');
const router = express.Router();

// Routes for user registration and login
router.post('/register', protect, adminOnly, registerUser);
router.put('/update/:id', protect, adminOnly, updateUser); // Update user by ID
router.delete('/delete/:id', protect, adminOnly, deleteUser); // Delete user by ID
router.get('/all', protect, adminOnly, getAllUsers); // Get all users
router.get('/:id', protect, getUserById);
router.post('/login', loginUser);
router.post('/logout', logout);

module.exports = router;
