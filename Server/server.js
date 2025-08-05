require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const { markAttendance, getAttendance, getRecordCount } = require('./blockchain'); // Import blockchain functions

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  // Remove deprecated options as they are not needed in recent versions
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', studentRoutes);
app.use('/api', facultyRoutes);
app.use('/api/auth', authRoutes);

// Blockchain API Endpoints
// Endpoint to mark attendance
app.post('/api/mark-attendance', async (req, res) => {
    const { studentId, date, isPresent, Subject } = req.body;
    try {
        await markAttendance(studentId, date, isPresent, Subject);
        res.json({ success: true, message: 'Attendance marked successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Endpoint to get attendance record by index
app.get('/api/get-attendance/:index', async (req, res) => {
    const index = req.params.index;
    try {
        const record = await getAttendance(index);
        res.json({ success: true, record });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Endpoint to get total number of attendance records
app.get('/api/record-count', async (req, res) => {
    try {
        const count = await getRecordCount();
        res.json({ success: true, count });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});