const Student = require('../models/students'); // Import your Student model
const Faculty = require('../models/Faculty'); // Import your Faculty model

// Function to register a user (both students and faculty)
const registerUser = async (req, res) => {
    const { username, password, role, course } = req.body; // Include course in request body

    try {
        if (role === 'student') {
            const newStudent = new Student({ username, password, course }); // Save course for students
            await newStudent.save();
            return res.status(201).json({ 
                message: 'Student registered successfully!',
                user: {
                    name: newStudent.name || newStudent.username,
                    username: newStudent.username,
                    course: newStudent.course || '' // Include course
                }
            });
        } else if (role === 'faculty') {
            if (!course) {
                return res.status(400).json({ message: 'Faculty must have an assigned course.' });
            }
            const newFaculty = new Faculty({ username, password, course }); // Save course for faculty
            await newFaculty.save();
            return res.status(201).json({ 
                message: 'Faculty registered successfully!',
                user: {
                    name: newFaculty.name || newFaculty.username,
                    username: newFaculty.username,
                    course: newFaculty.course // Include course
                }
            });
        } else {
            return res.status(400).json({ message: 'Invalid role specified.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error registering user', error });
    }
};

// Function to login a user (both students and faculty)
const loginUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        let user;

        if (role === 'student') {
            user = await Student.findOne({ username, password }); // Adjust according to your password storage method
        } else if (role === 'faculty') {
            user = await Faculty.findOne({ username, password }); // Adjust according to your password storage method
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        return res.status(200).json({ 
            message: 'Login successful',
            role,
            user: {
                name: user.name || user.username,
                username: user.username,
                course: user.course || '' // Include course
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in', error });
    }
};

module.exports = { registerUser, loginUser };