const Faculty = require('../models/Faculty');

// Add a new faculty member
exports.addFaculty = async (req, res) => {
    const { name, username, password, course } = req.body;

    try {
        const existingFaculty = await Faculty.findOne({ username });
        if (existingFaculty) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newFaculty = new Faculty({ name, username, password, course });
        await newFaculty.save();
        res.status(201).json({ message: 'Faculty added successfully', faculty: newFaculty });
    } catch (error) {
        console.error('Error adding faculty:', error);
        res.status(500).json({ error: 'Failed to add faculty' });
    }
};

// Get all faculty members
exports.getFaculty = async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.status(200).json(faculties);
    } catch (error) {
        console.error('Error fetching faculty:', error);
        res.status(500).json({ error: 'Failed to fetch faculty' });
    }
};
