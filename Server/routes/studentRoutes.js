const express = require('express');
const { addStudent, getStudents } = require('../controllers/studentController');

const router = express.Router();

// Add a new student
router.post('/students', addStudent);

// Get all students
router.get('/students', getStudents);

module.exports = router;
