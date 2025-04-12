// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract voter {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address owner;
    mapping(address => bool) public voters;     // to keep track which person has already voted

    uint256 public votingStart;
    uint256 public votingEnd;

constructor(string[] memory _candidateNames, uint256 _durationInMinutes) {
    for (uint256 i = 1; i < _candidateNames.length; i++) {
        candidates.push(Candidate({
            name: _candidateNames[i],
            voteCount: 0
        }));
    }
    owner = msg.sender;
    votingStart = block.timestamp;
    votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
}

    modifier onlyOwner {
        require(msg.sender == owner,"Only the owner can call this function");
        _;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }

    function addCandidate(string memory _name) public onlyOwner {
        require(msg.sender == owner,"Only the owner can call this function");
        candidates.push(Candidate({
                name: _name,
                voteCount: 0
        }));
    }

    function vote(uint256 _candidateIndex) public {
        require(block.timestamp >= votingStart && block.timestamp <= votingEnd, "Voting period is over");
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;   //once the voter has voted they cant vote again
    }

    function getAllVotesOfCandidates() public view returns (Candidate[] memory){
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
    return (block.timestamp >= votingStart && block.timestamp < votingEnd);
}

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= votingStart, "Voting has not started yet.");
        if (block.timestamp >= votingEnd) {
            return 0;
        }
        return votingEnd - block.timestamp;
}

    function removeCandidate(uint256 _candidateIndex) public onlyOwner {
    require(_candidateIndex < candidates.length, "Invalid candidate index.");

    // Remove the candidate from the array
    for (uint i = _candidateIndex; i < candidates.length - 1; i++) {
        candidates[i] = candidates[i + 1];
    }
    candidates.pop();
}

   function hasVoted(address voterAddress) public view returns (bool) {
    return voters[voterAddress];
}
}