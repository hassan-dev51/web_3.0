require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/bKuJRsfB8y8jght9Dl86tRCGROP5VJgG",
      accounts: [
        "2c89195bd55dd7e0093e68a8da69b9978f870a5a01791d28ce16ad61d257a5dd",
      ],
    },
  },
};
