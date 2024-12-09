// const jwt = require('jsonwebtoken');

// exports.protect = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };


const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model

exports.protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from the database
        const user = await User.findById(decoded.id).select('-password'); // Exclude password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user; // Attach user object to the request
        next();
    } catch (err) {
        console.error('Token verification error:', err.message);
        res.status(401).json({ message: 'Invalid token' });
    }
};
