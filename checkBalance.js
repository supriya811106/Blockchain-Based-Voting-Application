const { ethers } = require("ethers");

async function checkBalance() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const balance = await provider.getBalance(wallet.address);
  console.log(`Balance of ${wallet.address} is ${ethers.utils.formatEther(balance)} ETH`);
}

checkBalance();
