const API_BASE_URL = 'http://localhost:5000/api';

// Function to mark attendance
export const markAttendance = async (studentId, date, isPresent, Subject) => {
    const response = await fetch(`${API_BASE_URL}/mark-attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, date, isPresent, Subject }),
    });
    return response.json();
};

// Function to get attendance record by index
export const getAttendance = async (index) => {
    const response = await fetch(`${API_BASE_URL}/get-attendance/${index}`);
    return response.json();
};

// Function to get total number of attendance records
export const getRecordCount = async () => {
    const response = await fetch(`${API_BASE_URL}/record-count`);
    return response.json();
};