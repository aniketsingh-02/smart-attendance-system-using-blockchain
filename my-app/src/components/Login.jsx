// Login.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login({ onLogin }) {
  const [role, setRole] = useState(''); // Role selection (admin, faculty, student)
  const [username, setUsername] = useState(''); // Username input
  const [password, setPassword] = useState(''); // Password input
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [errorMessage, setErrorMessage] = useState(''); // Display error message
  const navigate = useNavigate();

  // Handle role selection (admin, faculty, student)
  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
  
    // Hardcoded admin login check
    if (role === 'admin' && username === 'admin' && password === 'admin123') {
      onLogin(role);
      navigate(`/${role}`);
      return;
    }
  
    if (role && username && password) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username,
          password,
          role,
        });
  
        if (response.status === 200) {
          const userData = response.data.user; // Extract user data from API response
          onLogin(role, userData); // Pass user data to parent component
          navigate(`/${role}`, { state: userData }); // Pass user data to dashboard
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || 'Login failed. Please check your credentials.'
        );
      }
    } else {
      setErrorMessage('Please provide valid username, password, and role.');
    }
  };  

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      {!role ? (
        <div className="login-options">
          <div className="login-box" onClick={() => handleRoleSelection('admin')}>
            <h3>Admin Login</h3>
            <button>Login as Admin</button>
          </div>
          <div className="login-box" onClick={() => handleRoleSelection('faculty')}>
            <h3>Faculty Login</h3>
            <button>Login as Faculty</button>
          </div>
          <div className="login-box" onClick={() => handleRoleSelection('student')}>
            <h3>Student Login</h3>
            <button>Login as Student</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
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
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default Login;
