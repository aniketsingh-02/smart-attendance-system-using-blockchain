// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import StudentDashboard from './components/StudentDashboard';
import ViewStudents from './components/viewStudents';  // Import ViewStudents
import ViewFaculty from './components/viewFaculty';    // Import ViewFaculty

import './App.css';
import logo from './assets/images/sas_logo.png'; // Ensure correct path for the logo

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check for token and role on initial load
    const storedRole = localStorage.getItem('userRole');
    const token = localStorage.getItem('token');
    if (token) {
      setUserRole(storedRole);
    }
  }, []);

  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role); // Store user role for persistence
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('userRole'); // Clear stored user role on logout
    localStorage.removeItem('token'); // Remove token on logout
  };

  return (
    <Router>
      <div className="App">
        {!userRole && (
          <header className="App-header">
            <img src={logo} className="App-logo" alt="Smart Attendance System Logo" />
            <h1>Smart Attendance System</h1>
          </header>
        )}

        <main>
          <Routes>
            {/* Redirect to the respective dashboard if the user is already logged in */}
            <Route
              path="/"
              element={userRole ? <Navigate to={`/${userRole}`} /> : <Navigate to="/login" />}
            />

            {/* Login route */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* Admin dashboard */}
            <Route
              path="/admin"
              element={
                userRole === 'admin' ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/login" />
              }
            />

            {/* Faculty dashboard */}
            <Route
              path="/faculty"
              element={
                userRole === 'faculty' ? <FacultyDashboard onLogout={handleLogout} /> : <Navigate to="/login" />
              }
            />

            {/* Student dashboard */}
            <Route
              path="/student"
              element={
                userRole === 'student' ? <StudentDashboard onLogout={handleLogout} /> : <Navigate to="/login" />
              }
            />

            {/* View students list (Admin access only) */}
            <Route
              path="/admin/students"
              element={
                userRole === 'admin' ? <ViewStudents /> : <Navigate to="/login" />
              }
            />

            {/* View faculty list (Admin access only) */}
            <Route
              path="/admin/faculty"
              element={
                userRole === 'admin' ? <ViewFaculty /> : <Navigate to="/login" />
              }
            />

            {/* Fallback route for undefined routes */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>

        {!userRole && (
          <footer className="App-footer">
            © 2024 Smart Attendance System. All rights reserved.
          </footer>
        )}
      </div>
    </Router>
  );
}

export default App;
