const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Leave', leaveSchema);
