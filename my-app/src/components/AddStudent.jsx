import React, { useState } from 'react';
import axios from 'axios';

function AddStudent() {
  const [studentName, setStudentName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Stream, setStream] = useState(''); 
  const [Semester, setSemester] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/students', {
        name: studentName,
        username,
        password,
        role: 'student',
        Stream,
        Semester
      });

      if (response.status === 201) {
        setSuccessMessage('Student added successfully!');
        // Clear the form after successful submission
        setStudentName('');
        setUsername('');
        setPassword('');
        setStream('');
        setSemester('');
      }
    } catch (error) {
      console.error('Error adding student:', error.response?.data);
      setErrorMessage('Error adding student. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <header className="dashboard-header">
        <h1>Add Student</h1>
      </header>
      <div className="dashboard-main">
        <form onSubmit={handleSubmit} className="form-container">
          <label>
            Student Name:
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Stream:
            <input
              type="text"
              value={Stream}
              onChange={(e) => setStream(e.target.value)}
              required
            />
          </label>
          <label>
            Semester:
            <input
              type="text"
              value={Semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add Student</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default AddStudent;