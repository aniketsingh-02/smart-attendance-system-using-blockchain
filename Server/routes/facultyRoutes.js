const express = require('express');
const { addFaculty, getFaculty } = require('../controllers/facultyController');

const router = express.Router();

// Add a new faculty
router.post('/faculty', addFaculty);

// Get all faculty members
router.get('/faculty', getFaculty);

module.exports = router;
