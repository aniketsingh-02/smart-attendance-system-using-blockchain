import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { markAttendance, getAttendance, getRecordCount } from '../services/attendance';
import './Dashboard.css'; // Ensure this path matches your file structure

function StudentDashboard({ onLogout }) {
  const location = useLocation();
  const { name: Name, username } = location.state || { name: 'Student', username: '' };

  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [attendanceVisible, setAttendanceVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [attendanceTime, setAttendanceTime] = useState("");
  const [subject, setSubject] = useState(""); // New state for subject
  const [errorMessage, setErrorMessage] = useState("");
  const [records, setRecords] = useState([]); // To store attendance records
  const [count, setCount] = useState(0); // To store total number of records
  const [showAttendanceTable, setShowAttendanceTable] = useState(false); // Control visibility of attendance table

  // Set the current date and time when the component mounts
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(' ')[0].substring(0, 5); // Format to HH:MM

    setAttendanceDate(formattedDate);
    setAttendanceTime(formattedTime);

    // Fetch attendance records on component mount
    fetchAttendanceRecords();
  }, []);

  // Function to fetch attendance records
  // Function to fetch attendance records for the logged-in student only
const fetchAttendanceRecords = async () => {
  try {
    const countResponse = await getRecordCount();
    if (countResponse.success) {
      setCount(countResponse.count);
      const studentRecords = [];

      for (let i = 0; i < countResponse.count; i++) {
        const recordResponse = await getAttendance(i);
        
        if (recordResponse.success) {
          const record = recordResponse.record;
          
          // Check if the record belongs to the logged-in student
          if (record[0] === username) { 
            studentRecords.push(record);
          }
        }
      }
      setRecords(studentRecords);
    }
  } catch (error) {
    setErrorMessage('Failed to fetch attendance records: ' + error.message);
  }
};


  // Function to mark attendance
  const markStudentAttendance = async () => {
    if (!subject) {
      setErrorMessage("Please select a subject.");
      return;
    }

    try {
      const response = await markAttendance(username, attendanceDate, true, subject); // Include subject in the API call
      if (response.success) {
        setAttendanceMarked(true);
        setAttendanceVisible(false); // Hide attendance form after marking
        setErrorMessage(""); // Clear any previous error messages
        fetchAttendanceRecords(); // Refresh attendance records
      } else {
        throw new Error(response.error || 'Failed to mark attendance');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Function to handle feedback submission
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    setFeedback(""); // Clear feedback after submission
    setFeedbackVisible(false); // Hide feedback box after submission
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Student Dashboard</h1>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </header>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <h2>{Name}</h2>
          <button onClick={() => { setAttendanceVisible(true); setFeedbackVisible(false); setShowAttendanceTable(false); }}>Mark Attendance</button>
          <button onClick={() => { setFeedbackVisible(true); setAttendanceVisible(false); setShowAttendanceTable(false); }}>Feedback</button>
          <button onClick={() => { setShowAttendanceTable(true); setAttendanceVisible(false); setFeedbackVisible(false); }}>Your Attendance</button>
        </aside>
        <main className="dashboard-main">
          <h2>Hello {username}!</h2>

          {/* Mark Attendance Section */}
          {attendanceMarked ? (
            <p>Attendance Marked</p>
          ) : (
            attendanceVisible && (
              <div className="attendance-form">
                <h3>Mark Attendance</h3>
                <label>
                  Date:
                  <input 
                    type="date" 
                    value={attendanceDate} 
                    onChange={(e) => setAttendanceDate(e.target.value)} 
                    required 
                  />
                </label>
                <label>
                  Time:
                  <input 
                    type="time" 
                    value={attendanceTime} 
                    onChange={(e) => setAttendanceTime(e.target.value)} 
                    required 
                  />
                </label>
                <label>
                  Subject:
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="subject-dropdown" // Add a class for styling
                  >
                    <option value="">Select Subject</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="RIL">RIL</option>
                    <option value="UID">UID</option>
                    <option value="EM">EM</option>
                  </select>
                </label>
                <button onClick={markStudentAttendance}>Submit Attendance</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
              </div>
            )
          )}

          {/* Feedback Section */}
          {feedbackVisible && (
            <div className="feedback-form">
              <h3>Feedback</h3>
              <form onSubmit={handleFeedbackSubmit}>
                <textarea 
                  className="feedback-textarea" 
                  value={feedback} 
                  onChange={(e) => setFeedback(e.target.value)} 
                  placeholder="Enter your feedback here..." 
                  required 
                />
                <button type="submit">Submit Feedback</button>
              </form>
            </div>
          )}

          {/* Attendance Table Section */}
          {showAttendanceTable && (
            <div className="attendance-table">
              <h3>Your Attendance</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Present</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={index}>
                      <td>{record[1]}</td>
                      <td>{record[3]}</td> {/* Display subject */}
                      <td>{record[2] ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;