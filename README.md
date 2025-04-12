
## Decentralized Voting Application

![Image](https://github.com/user-attachments/assets/5572b30c-47c5-431d-9c51-6c6a1ce0644d)

A blockchain-based voting system built on Ethereum to ensure transparency, security, and accessibility. It leverages **smart contracts**, **Ethers.js**, and **MetaMask** to allow users to cast and verify votes on the blockchain.

---

## Features

- Secure, tamper-proof voting via smart contracts
- MetaMask integration for user authentication and transaction signing
- Live vote status and result updates
- Simple UI served via Express server

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** – to run the backend server
- **[MetaMask](https://metamask.io/)** – browser extension for Ethereum wallet interaction
- **Ethereum Account** – for deploying and interacting with smart contracts
- **Ethers.js** – for blockchain communication
- **Solidity Compiler** – (optional) for contract compilation

---

## Project Structure
```
/Blockchain-Based-Voting-Application
│
├── /public/                      # Static frontend assets
│   ├── /images/                  # Images used in the frontend
│   │   ├── voter1.jpg
│   │   ├── voter2.jpg
│   │   └── voter3.jpg
│   ├── index.html                # Main HTML document for the frontend
│   ├── main.js                   # JavaScript file containing front-end logic
│   └── style.css                 # CSS file for styling the frontend
│
├── /contracts/                   # Smart contract source code
│   ├── voter.sol                 # Solidity source code for the voting contract
│
├── /artifacts/                   # Compiled smart contracts and metadata
│   ├── contracts/                # Contains the compiled contract files (e.g., ABI)
│   │   ├── voter.json            # ABI and metadata for the voter contract
│
├── /scripts/                     # Scripts for deployment and interactions
│   ├── deploy.js                 # Deployment script for deploying the contract to Ethereum
│
├── /test/                        # Tests for the smart contract
│   └── test.js                   # Unit tests for the smart contract
│
├── .gitignore                    # Git ignore file to exclude unnecessary files
├── .env                          # Environment file for storing sensitive credentials (e.g., private keys)
├── index.js                      # Main server entry point using Express.js
├── package.json                  # Node.js package definition, includes dependencies and scripts
├── checkBalance.js               # Script to check the balance of the contract or user
└── README.md                     # Project documentation 
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/supriya81106/Blockchain-Based-Voting-Application.git
cd Blockchain-Based-Voting-Application
```

### 2. Install Dependencies

```bash
npm install express ethers dotenv express-fileupload
```

### 3. Configure Environment Variables

Create a `.env` file in the root with the following content:

```env
API_URL=https://<your_ethereum_node_api>
PRIVATE_KEY=<your_private_key>
CONTRACT_ADDRESS=<deployed_contract_address>
PORT=3000
```

> ⚠**Never expose your private key publicly.** Use environment variables securely.

### 4. Start the Server

```bash
node index.js
```

Your app will run at `http://localhost:3000`

---

## Usage Guide

### Connect MetaMask

- Click the **"Connect MetaMask"** button on the homepage.
- Approve the connection request in your MetaMask wallet.

### Cast a Vote

- Enter the **candidate index** and click **"Cast Vote"**.
- MetaMask will prompt you to confirm the transaction.

### Check Voting Status

- Click the **"Check Voting Status"** button to fetch the latest results from the blockchain.

---

## Smart Contract Features

- **Add/Remove Candidates** – Built into the `voter.sol` contract
- **Vote Recording** – Immutable and secure
- **Result Retrieval** – Real-time updates

---

## Troubleshooting

- **MetaMask Not Connected**  
  → Ensure MetaMask is installed and you're connected to the correct network.

- **Contract Not Working**  
  → Verify that `CONTRACT_ADDRESS` in `.env` matches the deployed contract.

- **Transaction Errors**  
  → Check for gas limits, correct private key, and enough ETH in your account.

