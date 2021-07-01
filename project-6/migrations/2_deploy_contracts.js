// migrating the appropriate contracts
var FarmerRole = artifacts.require("./FarmerRole.sol");
var DistributorRole = artifacts.require("./DistributorRole.sol");
var RetailerRole = artifacts.require("./RetailerRole.sol");
var ConsumerRole = artifacts.require("./ConsumerRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");
const fs = require('fs');

module.exports = async (deployer, _, accounts) => {
  await deployer.deploy(FarmerRole);
  await deployer.deploy(DistributorRole);
  await deployer.deploy(RetailerRole);
  await deployer.deploy(ConsumerRole);
  await deployer.deploy(SupplyChain);

  // Seed farmer
  const farmer = {
    id: accounts[1],
    farmName: "Bitcoin Mining Farm",
    farmInformation: "Decentralized Coffee Farming",
    farmLattitude: "34.623451632029486",
    farmLongitude: "135.73874694824312",
  };

  const farmerContract = await FarmerRole.deployed();
  await farmerContract.addFarmer(farmer.id);

  // Seed distributor
  const distributorContract = await DistributorRole.deployed();
  await distributorContract.addDistributor(accounts[2]);

  // Seed retailer
  const retailerContract = await RetailerRole.deployed();
  await retailerContract.addRetailer(accounts[3]);

  // Seed consumer
  const consumerContract = await ConsumerRole.deployed();
  await consumerContract.addConsumer(accounts[4]);

  // Seed coffee
  const supplyChainContract = await SupplyChain.deployed();

  [
    "Bitcoin Coffee Beans",
    "Ethereum Coffee Beans",
    "Doge Coffee Beans"
  ].forEach(async (coffee, index) => {
    await supplyChainContract.harvestItem(
      index + 1, 
      farmer.id, 
      farmer.farmName, 
      farmer.farmInformation, 
      farmer.farmLattitude, 
      farmer.farmLongitude, 
      coffee
    );
  });
};
