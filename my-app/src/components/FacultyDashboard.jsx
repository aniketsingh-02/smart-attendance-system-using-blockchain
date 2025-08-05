import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAttendance, getRecordCount } from '../services/attendance';
import './Dashboard.css';

function FacultyDashboard({ onLogout }) {
  const location = useLocation();
  const { name: Name, username, course: facultyCourse = '' } = location.state || { name: 'Faculty', username: '', course: '' };
  
  const [errorMessage, setErrorMessage] = useState("");
  const [records, setRecords] = useState([]);
  const [count, setCount] = useState(0);

  // Fetch and filter attendance records
  const fetchAttendanceRecords = async () => {
    try {
      const countResponse = await getRecordCount();
      if (!countResponse.success) {
        throw new Error("Failed to fetch record count");
      }
      setCount(countResponse.count);

      // Fetch all records in parallel for better performance
      const recordPromises = Array.from({ length: countResponse.count }, (_, i) => getAttendance(i));
      const recordResponses = await Promise.all(recordPromises);
      
      // Filter records that match the faculty's assigned course
      const filteredRecords = recordResponses
        .filter(response => response.success && response.record[3] === facultyCourse)
        .map(response => response.record);
      
      setRecords(filteredRecords);
    } catch (error) {
      setErrorMessage('Failed to fetch attendance records: ' + error.message);
    }
  };

  // Fetch attendance records when the component mounts or facultyCourse changes
  useEffect(() => {
    if (facultyCourse) {
      fetchAttendanceRecords();
    }
  }, [facultyCourse]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Faculty Dashboard</h1>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </header>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar"> 
         <h2>{Name}</h2> 
          <button onClick={fetchAttendanceRecords}>View Student Attendance</button>
        </aside>
        <main className="dashboard-main">
          <h2>Welcome, {username}!</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="attendance-records">
            <h3>Attendance Records for {facultyCourse}</h3>
            <p>Total Records: {records.length}</p>
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
                    <td>{record[0]}</td> {/* Student ID */}
                    <td>{record[1]}</td> {/* Date */}
                    <td>{record[3]}</td> {/* Subject */}
                    <td>{record[2] ? 'Yes' : 'No'}</td> {/* Present */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FacultyDashboard;