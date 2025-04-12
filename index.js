require('dotenv').config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
app.use(
    fileUpload({
        extended: true
    })
)
app.use(express.static(__dirname));
app.use(express.json());
const path = require('path');
const ethers = require('ethers');


var port = 3000;

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const {abi} = require('./artifacts/contracts/voter.sol/voter.json');
const provider = new ethers.providers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})





//this is the correct code
app.post("/vote", async (req, res) => {
    var vote = req.body.vote;
    try {
        const isOwner = await contractInstance.isOwner();
        if (!isOwner) {
            return res.status(403).send("Only the owner can add a candidate.");
        }
    console.log(vote)
    async function storeDataInBlockchain(vote) {
        console.log("Adding the candidate in voting contract...");
        const tx = await contractInstance.addCandidate(vote);
        await tx.wait();
    }
    const bool = await contractInstance.getVotingStatus();
    if (bool == true) {
        await storeDataInBlockchain(vote);
        res.send("The candidate has been registered in the smart contract");
    }
    else {
        res.send("Voting is finished");
    }
  }catch (error) {
        console.error("Error while adding candidate:", error);
        res.status(500).send("An error occurred while adding the candidate.");
   } 
});




app.post("/removeCandidate", async (req, res) => {
    try {
        const candidateIndex = req.body.candidateIndex;
        if (candidateIndex === undefined) {
            return res.status(400).send('Candidate index is required');
        }

        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

        // Sending a transaction to the smart contract to remove a candidate
        const tx = await contractInstance.removeCandidate(candidateIndex);
        await tx.wait(); // Wait for the transaction to be mined

        res.send("Candidate successfully removed.");
    } catch (error) {
        console.error("Error removing candidate:", error);
        res.status(500).send("Error occurred while removing the candidate.");
    }
});

app.listen(port, function () {
    console.log("App is listening on port 3000")
});