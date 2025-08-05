const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  course: { type: String, required: true } // Assuming you want to keep 'subject' for faculty
});

const Faculty = mongoose.model('Faculty', facultySchema);
module.exports = Faculty;
