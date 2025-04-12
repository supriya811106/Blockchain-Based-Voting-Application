require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.19",
   defaultNetwork: "goerli", 
   networks: {
      hardhat: {},
      goerli: { // Change to Goerli
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`],
         gas: 2100000, 
         gasPrice: 20000000000, 
      }
   },
}
