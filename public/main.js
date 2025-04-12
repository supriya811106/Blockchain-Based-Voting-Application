const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".img-slide");

let currentSlide = 0;
let slideInterval;
let isPaused = false;

var sliderNav = function (manual) {
    // Remove active class from all buttons and slides
    btns.forEach(btn => btn.classList.remove("active"));
    slides.forEach(slide => slide.classList.remove("active"));

    if (manual !== undefined) {
        currentSlide = manual;
    }

    // Set active class for current slide
    btns[currentSlide].classList.add("active");
    slides[currentSlide].classList.add("active");

    // Move to the next slide for the next interval
    currentSlide = (currentSlide + 1) % slides.length;
}

// Function to start the automatic slide change
const startSlide = () => {
    slideInterval = setInterval(() => {
        if (!isPaused) {
            sliderNav();
        }
    }, 5000); // Change slide every 5 seconds
}

// Add event listeners for pausing and resuming the slideshow on hover
slides.forEach(slide => {
    slide.addEventListener("mouseover", () => isPaused = true);
    slide.addEventListener("mouseleave", () => isPaused = false);
});

// Event listeners for manual navigation
btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        clearInterval(slideInterval);
        sliderNav(i);
        startSlide();
    });
});

startSlide(); // Start the slideshow



let WALLET_CONNECTED = "";
let contractAddress = "0x1156bbBF69006d9129C495E88A198fA8F3564371";
let contractAbi =  [
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "_candidateNames",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "_durationInMinutes",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllVotesOfCandidates",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct voter.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRemainingTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getVotingStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "voterAddress",
          "type": "address"
        }
      ],
      "name": "hasVoted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "removeCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
const connectMetamask = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    WALLET_CONNECTED = await signer.getAddress();
    var element = document.getElementById("metamasknotification");
    element.innerHTML = "Metamask is connected " + WALLET_CONNECTED;
}



const getAllCandidates = async() => {
     if(WALLET_CONNECTED != 0) {
        var p3 = document.getElementById("p3");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        p3.innerHTML = "Please wait, getting all the candidates from the voting smart contract";
        var candidates = await contractInstance.getAllVotesOfCandidates();
        console.log(candidates);
        var table = document.getElementById("myTable");

        for (let i = 1; i <= candidates.length; i++) {
            var row = table.insertRow();
            var idCell = row.insertCell();
            var nameCell = row.insertCell();
            var vc = row.insertCell();

            idCell.innerHTML = i;
            nameCell.innerHTML = candidates[i].name;
            vc.innerHTML = candidates[i].voteCount;
        }

        p3.innerHTML = "The candidate list is updated"
      }
    else{
        var p3 = document.getElementById("p3");
        p3.innerHTML = "Please connect metamask first";
    }
}


const castVote = async() => {
    if(WALLET_CONNECTED != 0) {
        var name = document.getElementById("voteIndexInput");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);

        var cand = document.getElementById("cand");

        const hasAlreadyVoted = await contractInstance.hasVoted(WALLET_CONNECTED);
        if (hasAlreadyVoted) {
            alert("You have already voted.");
            return;
        }

        cand.innerHTML = "Please wait, adding a vote in the smart contract";
        const tx = await contractInstance.vote(name.value);
        await tx.wait();
        cand.innerHTML = "Vote added !!!";
    }
    else {
        var cand = document.getElementById("cand");
        cand.innerHTML = "Please connect metamask first";
    }
}



function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} hours, ${minutes} minutes, ${remainingSeconds} seconds`;
}





const voteStatus = async() => {
    if(WALLET_CONNECTED != 0) {
        var status = document.getElementById("status");
        var remainingTime = document.getElementById("time");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        const currentStatus = await contractInstance.getVotingStatus();
        const time = await contractInstance.getRemainingTime();
        console.log(time);
        status.innerHTML = currentStatus == 1 ? "Voting is currently open" : "Voting is finished";
        remainingTime.innerHTML = `Remaining time is ${formatTime(parseInt(time, 16))}`;
    }
    else {
        var status = document.getElementById("status");
        status.innerHTML = "Please connect metamask first";
    }
 }

 


async function removeCandidate(candidateIndex) {
    if (WALLET_CONNECTED != 0) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);

        var notification = document.getElementById("notification"); // Assuming you have an element for notifications
        notification.innerHTML = "Please wait, removing the candidate from the smart contract";

        try {
            const tx = await contractInstance.removeCandidate(candidateIndex);
            await tx.wait();
            notification.innerHTML = "Candidate removed successfully!";
        } catch (error) {
            console.error(error);
            notification.innerHTML = "Error occurred while removing the candidate.";
        }
    }
    else {
        var notification = document.getElementById("notification");
        notification.innerHTML = "Please connect to MetaMask first";
    }
}

