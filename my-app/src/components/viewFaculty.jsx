// src/components/ViewFaculty.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewFaculty = () => {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get('/api/faculty');
        setFaculty(response.data);
      } catch (error) {
        console.error('Error fetching faculty:', error);
      }
    };
    fetchFaculty();
  }, []); // Fetch once when the component mounts

  return (
    <div className="list">
      <h1>Faculty List</h1>
      <ul>
        {faculty.length > 0 ? (
          faculty.map(member => (
            <li key={member._id}>
              {member.name} - {member.email}
            </li>
          ))
        ) : (
          <p>No faculty members available</p>
        )}
      </ul>
    </div>
  );
};

export default ViewFaculty;
