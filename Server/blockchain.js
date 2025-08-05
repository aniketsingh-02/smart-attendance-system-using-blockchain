const Web3 = require('web3');

// Connect to Ganache (local Ethereum blockchain)
const ganacheUrl = 'http://127.0.0.1:7545'; // Ganache RPC URL
const web3 = new Web3(ganacheUrl);

// Import the contract ABI and address
const contractABI = require('../build/contracts/Attendance.json').abi; // Path to the compiled contract ABI
const contractAddress = '0xcbaBce30DE00Ec591DfDE4662393f4fC2F773795'; 

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to mark attendance
async function markAttendance(studentId, date, isPresent, Subject) {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.markAttendance(studentId, date, isPresent, Subject).send({
        from: accounts[0],
        gas: 300000, // Increase gas limit (default is 21000)
    });
    console.log('Attendance marked successfully!');
}

// Function to get attendance record by index
async function getAttendance(index) {
    const record = await contract.methods.getAttendance(index).call();
    return record;
}

// Function to get total number of attendance records
async function getRecordCount() {
    const count = await contract.methods.getRecordCount().call();
    return count;
}

module.exports = { markAttendance, getAttendance, getRecordCount };