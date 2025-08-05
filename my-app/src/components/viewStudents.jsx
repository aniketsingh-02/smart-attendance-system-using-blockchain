// src/components/ViewStudents.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []); // Fetch once when the component mounts

  return (
    <div className="list">
      <h1>Students List</h1>
      <ul>
        {students.length > 0 ? (
          students.map(student => (
            <li key={student._id}>
              {student.name} - {student.email}
            </li>
          ))
        ) : (
          <p>No students available</p>
        )}
      </ul>
    </div>
  );
};

export default ViewStudents;
