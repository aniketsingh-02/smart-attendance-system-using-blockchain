const Student = require('../models/students');

// Add a new student
exports.addStudent = async (req, res) => {
    const { name, username, password, Stream,Semester } = req.body;
    console.log('Received request to add student:', req.body);

    try {
        const existingStudent = await Student.findOne({ username });
        if (existingStudent) {
            console.log('Username already exists:', username);
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newStudent = new Student({ name, username, password, Stream,Semester });
        await newStudent.save();
        console.log('Student added successfully:', newStudent);
        res.status(201).json({ message: 'Student added successfully', student: newStudent });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Failed to add student' });
    }
};

// Get all students
exports.getStudents = async (req, res) => {
    console.log('Received request to fetch students');
    try {
        const students = await Student.find();
        console.log(`Fetched ${students.length} students`);
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};