// migrating the appropriate contracts

var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = async (deployer) => {
  await deployer.deploy(SupplyChain);
};
