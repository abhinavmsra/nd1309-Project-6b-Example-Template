// migrating the appropriate contracts
var FarmerRole = artifacts.require("./FarmerRole.sol");
var DistributorRole = artifacts.require("./DistributorRole.sol");
var RetailerRole = artifacts.require("./RetailerRole.sol");
var ConsumerRole = artifacts.require("./ConsumerRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = async (deployer) => {
  await deployer.deploy(FarmerRole);
  await deployer.deploy(DistributorRole);
  await deployer.deploy(RetailerRole);
  await deployer.deploy(ConsumerRole);
  await deployer.deploy(SupplyChain);
};
