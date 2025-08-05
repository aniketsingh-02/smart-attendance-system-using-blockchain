// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attendance {
    // Struct to store attendance records
    struct Record {
        string studentId; // Unique ID of the student
        string date;      // Date of attendance
        bool isPresent;   // Attendance status (true = present, false = absent)
        string Subject;
    }

    // Array to store all attendance records
    Record[] public records;

    // Address of the admin 
    address public admin;

    // Event to log attendance marking
    event AttendanceMarked(string studentId, string date, bool isPresent, string Subject);

    // Constructor to set the admin as the contract deployer
    constructor() {
        admin = msg.sender;
    }

    // Function to mark attendance (only callable by admin)
    function markAttendance(string memory _studentId, string memory _date, bool _isPresent , string memory Subject) public {
        require(msg.sender == admin, "Only admin can mark attendance");
        records.push(Record(_studentId, _date, _isPresent, Subject));
        emit AttendanceMarked(_studentId, _date, _isPresent, Subject);
    }

    // Function to get attendance record by index
    function getAttendance(uint index) public view returns (string memory, string memory, bool, string memory Subject) {
        require(index < records.length, "Invalid index");
        Record memory record = records[index];
        return (record.studentId, record.date, record.isPresent, record.Subject);
    }

    // Function to get total number of attendance records
    function getRecordCount() public view returns (uint) {
        return records.length;
    }
}