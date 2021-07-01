// migrating the appropriate contracts

var SupplyChain = artifacts.require("SupplyChain");

module.exports = async (deployer, _, accounts) => {
  await deployer.deploy(SupplyChain);

  const instance = await SupplyChain.deployed();

  // Seed Roles
  await instance.addFarmer(accounts[1], { from: accounts[0] });
  await instance.addDistributor(accounts[2], { from: accounts[0] });
  await instance.addRetailer(accounts[3], { from: accounts[0] });
  await instance.addConsumer(accounts[4], { from: accounts[0] });
};
