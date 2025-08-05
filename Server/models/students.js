const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Stream: { type: String, required: true },
  Semester: { type: String, required: true } 
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;