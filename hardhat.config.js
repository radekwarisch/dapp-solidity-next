require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { ALCHEMY_API_URL, RINKEBY_KEY } = process.env;

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: ALCHEMY_API_URL,
      accounts: [RINKEBY_KEY],
    },
  },
};
