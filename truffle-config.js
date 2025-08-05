module.exports = {
  networks: {
    // Configuration for the Ganache local blockchain
    development: {
      host: "127.0.0.1", // Ganache RPC server (default)
      port: 7545,         // Ganache RPC port (default)
      network_id: "*",    // Match any network ID
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",   // Use the same Solidity version as in your contract
      settings: {
        optimizer: {
          enabled: true,  // Enable the Solidity optimizer
          runs: 200,      // Optimize for 200 runs
        },
      },
    },
  },
};