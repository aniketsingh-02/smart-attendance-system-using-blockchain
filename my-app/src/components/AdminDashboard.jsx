import React, { useState, useEffect } from 'react';
import AddFaculty from './AddFaculty';
import AddStudent from './AddStudent';
import { getAttendance, getRecordCount } from '../services/attendance';
import axios from 'axios';
import './Dashboard.css';

function AdminDashboard({ onLogout }) {
  const [view, setView] = useState('dashboard'); // Control which view to display
  const [facultyList, setFacultyList] = useState([]); // Store the list of faculties
  const [studentList, setStudentList] = useState([]); // Store the list of students
  const [errorMessage, setErrorMessage] = useState("");
  const [records, setRecords] = useState([]); // To store attendance records
  const [count, setCount] = useState(0); // To store total number of records

  // Function to fetch faculty list from the backend
  const fetchFacultyList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/faculty');
      setFacultyList(response.data);
    } catch (error) {
      console.error('Error fetching faculty list:', error);
    }
  };

  // Function to fetch student list from the backend
  const fetchStudentList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudentList(response.data);
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  };

  // Function to fetch attendance records
  const fetchAttendanceRecords = async () => {
    try {
      const countResponse = await getRecordCount();
      if (countResponse.success) {
        setCount(countResponse.count);
        const records = [];
        for (let i = 0; i < countResponse.count; i++) {
          const recordResponse = await getAttendance(i);
          if (recordResponse.success) {
            records.push(recordResponse.record);
          }
        }
        setRecords(records);
      }
    } catch (error) {
      setErrorMessage('Failed to fetch attendance records: ' + error.message);
    }
  };

  // Conditional rendering based on the selected action
  const renderContent = () => {
    switch (view) {
      case 'addFaculty':
        return <AddFaculty />;
      case 'addStudent':
        return <AddStudent />;
      case 'viewFaculty':
        return (
          <div>
            <h2>Faculty List</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Course</th>
                  <th>id</th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map((faculty) => (
                  <tr key={faculty._id}>
                    <td>{faculty.name}</td>
                    <td>{faculty.username}</td>
                    <td>{faculty.password}</td>
                    <td>{faculty.course}</td>
                    <td>{faculty._id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'viewStudent':
        return (
          <div>
            <h2>Student List</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Stream</th>
                  <th>Semester</th>
                  <th>id</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.username}</td>
                    <td>{student.password}</td>
                    <td>{student.Stream}</td>
                    <td>{student.Semester}</td>
                    <td>{student._id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'ViewStudentAttendance':
        return (
          <div>
            <h2>Student Attendance Records</h2>
            <p>Total Records: {count}</p>
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Present</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index}>
                    <td>{record[0]}</td>
                    <td>{record[1]}</td>
                    <td>{record[3]}</td>
                    <td>{record[2] ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return <h2>Welcome to the Admin Dashboard</h2>;
    }
  };

  // Fetch faculty or student list when the view changes
  useEffect(() => {
    if (view === 'viewFaculty') {
      fetchFacultyList(); // Fetch faculty list when 'viewFaculty' is selected
    } else if (view === 'viewStudent') {
      fetchStudentList(); // Fetch student list when 'viewStudent' is selected
    } else if (view === 'ViewStudentAttendance') {
      fetchAttendanceRecords(); // Fetch attendance records when 'ViewStudentAttendance' is selected
    }
  }, [view]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </header>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <button onClick={() => setView('addFaculty')}>Add Faculty</button>
          <button onClick={() => setView('addStudent')}>Add Student</button>
          <button onClick={() => setView('viewFaculty')}>View Faculty List</button>
          <button onClick={() => setView('viewStudent')}>View Student List</button>
          <button onClick={() => setView('ViewStudentAttendance')}>View Student Attendance</button>
        </aside>
        <main className="dashboard-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;