
## Decentralized Voting Application

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
/project_root
│
├── /public/               # Static frontend assets
│   ├── /images/           # Voter images
│   │   ├── voter1.jpg
│   │   ├── voter2.jpg
│   │   └── voter7.jpg
│   ├── index.html         # Main frontend HTML
│   ├── main.js            # Frontend logic
│   └── style.css          # Application styling
│
├── /artifacts/contracts/  # Compiled smart contracts
│   ├── voter.sol          # Solidity source
│   └── voter.json         # ABI & deployment metadata
│
├── index.js               # Express server entry point
└──  package.json           # Node.js dependencies and scripts
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/supriya81106/Blockchain-Voting-Application.git
cd Blockchain-Voting-Application
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

