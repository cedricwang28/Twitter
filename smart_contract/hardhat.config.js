require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.2",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/px4MhNKBrGOobRLy8-VPSXS0dPJivgCk",
      accounts: [
        "71d5ca4ae6d5cace356c8f38d6817a32a9e75a2effea3bf070a64a0d2a63b01b",
      ],
    },
  },
};
