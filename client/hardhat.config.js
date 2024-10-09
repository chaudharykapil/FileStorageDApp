/* eslint-disable no-undef */
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { API_URL, PRIVATE_KEY } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat:{
      
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/45e96e910e14469e827c9ebb39888b0a",
      accounts: ["c2c4ddc5a8d9954162c8afc414f0102a9d35d4553bfc3a99b7c2b38437d498fa"]
    }
  },
  paths: {
    artifacts: "./src/components/artifacts",
  },
};