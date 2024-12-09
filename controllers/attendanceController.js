
// const fs = require('fs');
// const path = require('path');
// const Attendance = require('../models/Attendance');

// exports.takeAttendance = async (req, res) => {
//     const { location, image, checkout } = req.body;  // Include checkout in the request body

//     try {
//         // Check if image is provided
//         if (!image) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'Image capture failed. Please try again.',
//                 code: 400
//             });
//         }

//         // Decode the Base64 image string
//         const matches = image.match(/^data:image\/(png|jpeg);base64,(.+)$/);
//         if (!matches || matches.length !== 3) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'Invalid image format',
//                 code: 400
//             });
//         }

//         // Convert the Base64 image string to a buffer
//         const imageBuffer = Buffer.from(matches[2], 'base64');
//         const imageName = `${Date.now()}.png`;  // Create a unique image name
//         const imagePath = path.join(__dirname, '../public/uploads', imageName);  // Path to save image

//         // Ensure the directory exists
//         fs.mkdirSync(path.dirname(imagePath), { recursive: true });

//         // Save the image file to the disk
//         fs.writeFileSync(imagePath, imageBuffer);

//         // Get the current date in the format 'Fri Nov 29 2024 16:43:45 GMT+0530 (India Standard Time)'
//         const checkinTime = new Date().toString();  // Get the formatted string for checkin time

//         // If checkout is provided, convert it to string format too
//         let checkoutTimeStr = null;
//         if (checkout) {
//             const checkoutTime = new Date(checkout);  // Convert checkout string to Date
//             if (isNaN(checkoutTime)) {
//                 return res.status(400).json({
//                     status: 'error',
//                     message: 'Invalid checkout time format',
//                     code: 400
//                 });
//             }
//             checkoutTimeStr = checkoutTime.toString();  // Get formatted string for checkout
//         }

//         // Save attendance record to the database
//         const attendance = new Attendance({
//             userId: req.user.id,  // Assuming the user is authenticated and their ID is in req.user
//             checkin: checkinTime,  // Store check-in time as formatted string
//             checkout: checkoutTimeStr,  // Store checkout time as formatted string
//             location,
//             image: imageName,  // Save the image file name
//         });

//         await attendance.save();  // Save attendance record to the database

//         // Format the attendance response for the client
//         const attendanceResponse = {
//             _id: attendance._id,
//             userId: attendance.userId,
//             checkin: attendance.checkin.toString(),  // Ensure checkin time is in the correct format
//             checkout: attendance.checkout ? attendance.checkout.toString() : null,  // Format checkout time
//             location: attendance.location,
//             image: attendance.image,
//             __v: attendance.__v
//         };

//         // Respond with success
//         res.status(201).json({
//             status: 'success',
//             message: 'Attendance marked successfully',
//             code: 201,
//             attendance: attendanceResponse
//         });
//     } catch (err) {
//         console.error('Error:', err);  // Log the error for debugging
//         res.status(500).json({
//             status: 'error',
//             message: 'Error marking attendance',
//             code: 500,
//             error: err.message
//         });
//     }
// };


// exports.getAllAttendance = async (req, res) => {
//     try {
//         const attendanceRecords = await Attendance.find();
//         res.status(200).json({
//             status: 'success',
//             message: 'All attendance records fetched successfully',
//             code: 200,
//             attendanceRecords
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Error fetching attendance records',
//             code: 500,
//             error: err.message
//         });
//     }
// };


// exports.getUserAttendance = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const userAttendance = await Attendance.find({ userId });
//         res.status(200).json({
//             status: 'success',
//             message: 'User attendance fetched successfully',
//             code: 200,
//             userAttendance
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Error fetching user attendance',
//             code: 500,
//             error: err.message
//         });
//     }
// };


// exports.updateAttendance = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { location, checkout } = req.body;

//         const updatedAttendance = await Attendance.findByIdAndUpdate(
//             id,
//             { location, checkout: checkout ? new Date(checkout).toString() : undefined },
//             { new: true }
//         );

//         if (!updatedAttendance) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Attendance record not found',
//                 code: 404
//             });
//         }

//         res.status(200).json({
//             status: 'success',
//             message: 'Attendance record updated successfully',
//             code: 200,
//             updatedAttendance
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Error updating attendance record',
//             code: 500,
//             error: err.message
//         });
//     }
// };


// exports.deleteAttendance = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deletedAttendance = await Attendance.findByIdAndDelete(id);

//         if (!deletedAttendance) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Attendance record not found',
//                 code: 404
//             });
//         }

//         res.status(200).json({
//             status: 'success',
//             message: 'Attendance record deleted successfully',
//             code: 200,
//             deletedAttendance
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Error deleting attendance record',
//             code: 500,
//             error: err.message
//         });
//     }
// };


// const fs = require('fs');
// const path = require('path');
// const Attendance = require('../models/Attendance');

// exports.takeAttendance = async (req, res) => {
//     const { location, image, checkout, description } = req.body; // Include description in the request body

//     try {
//         // Check if image is provided
//         if (!image) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'Image capture failed. Please try again.',
//                 code: 400
//             });
//         }

//         // Decode the Base64 image string
//         const matches = image.match(/^data:image\/(png|jpeg);base64,(.+)$/);
//         if (!matches || matches.length !== 3) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'Invalid image format',
//                 code: 400
//             });
//         }

//         // Convert the Base64 image string to a buffer
//         const imageBuffer = Buffer.from(matches[2], 'base64');
//         const imageName = `${Date.now()}.png`; // Create a unique image name
//         const imagePath = path.join(__dirname, '../public/uploads', imageName); // Path to save image

//         // Ensure the directory exists
//         fs.mkdirSync(path.dirname(imagePath), { recursive: true });

//         // Save the image file to the disk
//         fs.writeFileSync(imagePath, imageBuffer);

//         // Parse checkout time if provided
//         let checkoutTime = null;
//         if (checkout) {
//             checkoutTime = new Date(checkout);
//             if (isNaN(checkoutTime)) {
//                 return res.status(400).json({
//                     status: 'error',
//                     message: 'Invalid checkout time format',
//                     code: 400
//                 });
//             }
//         }

//         // Save attendance record to the database
//         const attendance = new Attendance({
//             userId: req.user.id, // Assuming the user is authenticated and their ID is in req.user
//             checkin: new Date(),
//             checkout: checkoutTime,
//             location,
//             image: imageName,
//             description, // Save description
//         });

//         await attendance.save(); // Save attendance record to the database

//         res.status(201).json({
//             status: 'success',
//             message: 'Attendance marked successfully',
//             code: 201,
//             attendance,
//         });
//     } catch (err) {
//         console.error('Error:', err); // Log the error for debugging
//         res.status(500).json({
//             status: 'error',
//             message: 'Error marking attendance',
//             code: 500,
//             error: err.message
//         });
//     }
// };

// exports.getAllAttendance = async (req, res) => {
//     try {
//         const attendanceRecords = await Attendance.find();
//         res.status(200).json({
//             status: 'success',
//             message: 'All attendance records fetched successfully',
//             code: 200,
//             attendanceRecords
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Error fetching attendance records',
//             code: 500,
//             error: err.message
//         });
//     }
// };

// exports.getUserAttendance = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const userAttendance = await Attendance.find({ userId });
//         res.status(200).json({
//             status: 'success',
//             message: 'User attendance fetched successfully',
//             code: 200,
//             userAttendance
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Error fetching user attendance',
//             code: 500,
//             error: err.message
//         });
//     }
// };

// exports.updateAttendance = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { location, checkout, description } = req.body;

//         const updatedAttendance = await Attendance.findByIdAndUpdate(
//             id,
//             {
//                 location,
//                 checkout: checkout ? new Date(checkout) : undefined,
//                 description, // Update description
//             },
//             { new: true }
//         );

//         if (!updatedAttendance) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Attendance record not found',
//                 code: 404
//             });
//         }

//         res.status(200).json({
//             status: 'success',
//             message: 'Attendance record updated successfully',
//             code: 200,
//             updatedAttendance
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Error updating attendance record',
//             code: 500,
//             error: err.message
//         });
//     }
// };

// exports.deleteAttendance = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deletedAttendance = await Attendance.findByIdAndDelete(id);

//         if (!deletedAttendance) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Attendance record not found',
//                 code: 404
//             });
//         }

//         res.status(200).json({
//             status: 'success',
//             message: 'Attendance record deleted successfully',
//             code: 200,
//             deletedAttendance
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Error deleting attendance record',
//             code: 500,
//             error: err.message
//         });
//     }
// };

// -----------------------------------------------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');
const Attendance = require('../models/Attendance');
const User = require('../models/User'); // Import User model

// Take attendance
exports.takeAttendance = async (req, res) => {
    const { location, image, checkout, description } = req.body; // Include description in the request body

    try {
        // Check if image is provided
        if (!image) {
            return res.status(400).json({
                status: 'error',
                message: 'Image capture failed. Please try again.',
                code: 400
            });
        }

        // Decode the Base64 image string
        const matches = image.match(/^data:image\/(png|jpeg);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid image format',
                code: 400
            });
        }

        // Convert the Base64 image string to a buffer
        const imageBuffer = Buffer.from(matches[2], 'base64');
        const imageName = `${Date.now()}.png`; // Create a unique image name
        const imagePath = path.join(__dirname, '../public/uploads', imageName); // Path to save image

        // Ensure the directory exists
        fs.mkdirSync(path.dirname(imagePath), { recursive: true });

        // Save the image file to the disk
        fs.writeFileSync(imagePath, imageBuffer);

        // Parse checkout time if provided
        let checkoutTime = null;
        if (checkout) {
            checkoutTime = new Date(checkout);
            if (isNaN(checkoutTime)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid checkout time format',
                    code: 400
                });
            }
        }

        // Save attendance record to the database
        const attendance = new Attendance({
            userId: req.user.id, // Assuming the user is authenticated and their ID is in req.user
            checkin: new Date(),
            checkout: checkoutTime,
            location,
            image: imageName,
            description, // Save description
        });

        await attendance.save(); // Save attendance record to the database

        res.status(201).json({
            status: 'success',
            message: 'Attendance marked successfully',
            code: 201,
            attendance,
        });
    } catch (err) {
        console.error('Error:', err); // Log the error for debugging
        res.status(500).json({
            status: 'error',
            message: 'Error marking attendance',
            code: 500,
            error: err.message
        });
    }
};

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().populate('userId', 'name email employeeId'); // Populate user data including employeeId
        res.status(200).json({
            status: 'success',
            message: 'All attendance records fetched successfully',
            code: 200,
            attendanceRecords,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching attendance records',
            code: 500,
            error: err.message,
        });
    }
};

// Get user's attendance records
exports.getUserAttendance = async (req, res) => {
    try {
        const { userId } = req.params;
        const userAttendance = await Attendance.find({ userId }).populate('userId', 'name email employeeId'); // Populate user data including employeeId
        res.status(200).json({
            status: 'success',
            message: 'User attendance fetched successfully',
            code: 200,
            userAttendance,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching user attendance',
            code: 500,
            error: err.message,
        });
    }
};

// Update attendance record
exports.updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { location, checkout, description } = req.body;

        const updatedAttendance = await Attendance.findByIdAndUpdate(
            id,
            {
                location,
                checkout: checkout ? new Date(checkout) : undefined,
                description, // Update description
            },
            { new: true }
        ).populate('userId', 'name email employeeId'); // Populate user data including employeeId

        if (!updatedAttendance) {
            return res.status(404).json({
                status: 'error',
                message: 'Attendance record not found',
                code: 404,
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Attendance record updated successfully',
            code: 200,
            updatedAttendance,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error updating attendance record',
            code: 500,
            error: err.message,
        });
    }
};

// Delete attendance record
exports.deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAttendance = await Attendance.findByIdAndDelete(id);

        if (!deletedAttendance) {
            return res.status(404).json({
                status: 'error',
                message: 'Attendance record not found',
                code: 404,
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Attendance record deleted successfully',
            code: 200,
            deletedAttendance,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error deleting attendance record',
            code: 500,
            error: err.message,
        });
    }
};
