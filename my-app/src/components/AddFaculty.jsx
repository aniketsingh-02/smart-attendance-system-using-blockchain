import React, { useState } from 'react';
import axios from 'axios';

function AddFaculty() {
  const [facultyName, setFacultyName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/faculty', {
        name: facultyName,
        username,
        password,
        role: 'faculty',
        course 
      });

      if (response.status === 201) {
        setSuccessMessage('Faculty added successfully!');
        // Clear the form after successful submission
        setFacultyName('');
        setUsername('');
        setPassword('');
        setCourse(''); // Updated to clear course
      }
    } catch (error) {
      console.error('Error adding faculty:', error.response?.data); // Log detailed error response
      setErrorMessage('Error adding faculty. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <header className="dashboard-header">
        <h1>Add Faculty</h1>
      </header>
      <div className="dashboard-main">
        <form onSubmit={handleSubmit} className="form-container">
          <label>
            Faculty Name:
            <input
              type="text"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
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
            Course: {/* Updated label to reflect course */}
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add Faculty</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default AddFaculty;
