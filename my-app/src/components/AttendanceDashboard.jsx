import React from 'react';
import { useNavigate } from 'react-router-dom';

function AttendanceDashboard() {
  const navigate = useNavigate();

  const attendanceRecords = [
    { date: '2024-09-01', status: 'Present' },
    { date: '2024-09-02', status: 'Absent' },
    // More records...
  ];

  return (
    <div>
      <h2>Your Attendance</h2>
      <ul>
        {attendanceRecords.map((record, index) => (
          <li key={index}>
            {record.date}: {record.status}
          </li>
        ))}
      </ul>
      {/* Back Button */}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default AttendanceDashboard;
