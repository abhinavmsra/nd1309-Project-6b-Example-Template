# Project write-up - UML

![Activity Diagram](images/Activity.jpg?raw=true "Activity Diagram")

![Sequence Diagram](images/Sequence.jpg?raw=true "Sequence Diagram")

![State Diagram](images/State.jpg?raw=true "State Diagram")

![Data Modeling Diagram](images/DataModeling.jpg?raw=true "Data Modeling Diagram")

# Libraries

| Library        |      Version      |  Description |
| ------------- | :-----------: | ----: |
| [Ethereum](https://www.ethereum.org/)       | -- | Provides blockchain with smart contract functionality |
| [Truffle Framework](http://truffleframework.com/)       |   v5.3.13 (core: 5.3.13)    |   Provides a development & testing pipeline in Solidity  |
| [Solidity](https://soliditylang.org/) |   0.8.6 (solc-js)    |    Programming language for writing smart contracts |
| [Ganache](https://www.trufflesuite.com/ganache) |   2.5.4.1367    |    Used as a personal blockchain for local Ethereum smart contract development  |
| [Node](https://nodejs.org/en/) |   v15.4.0    |    JavaScript runtime environment |
| [web3.js](https://web3js.readthedocs.io/en/v1.3.4/) |   v1.3.6    |    To interact with a local ethereum node (provided by Ganache) |
| [@truffle/hdwallet-provider](https://www.npmjs.com/package/@truffle/hdwallet-provider) |   1.4.1    |    HD Wallet-enabled Web3 provider |


# Tests 

```
cd project-6 && truffle test
```

![Test Screenshot](images/test.png?raw=true "Test Screenshot")

# Deployment

[Contract Address - 0x95829fDa63759ff7Fb9dcFc7ABeF5F65dC564793](https://rinkeby.etherscan.io/address/0x95829fDa63759ff7Fb9dcFc7ABeF5F65dC564793)

## Transactions

  - [Contract Creation](https://rinkeby.etherscan.io/tx/0x99169f48952cbd8a04e00d59393127cdbf46d144469217c697eaef365fcf08c8)

  - [Add Farmer](https://rinkeby.etherscan.io/tx/0xd1cc05f5603c0a91ad557b57bcb3a2453ea4de63bfc9f3b0324197767396fa07)

  - [Add Distributor](https://rinkeby.etherscan.io/tx/0xe2fd35c367ebc2908f032c3d89a0ec38ab2f1f4881c3891133fe9c1c0a0d74c5)

  - [Add Retailer](https://rinkeby.etherscan.io/tx/0x94df2f9e3f7dffcc6e2a569b0900c0f152b80cddd56dfa0aef072573ee002277)

  - [Add Consumer](https://rinkeby.etherscan.io/tx/0x7017c1c24b3982d043205ba92e818e6a0d1eb39b80c85231d4f74fe31a5df876)

# Dapp

```
cd project-6 && npm run dev
```

![Farmer](images/farmer.png?raw=true "Farmer")
![Distributor](images/distributor.png?raw=true "Distributor")
![Retailer](images/retailer.png?raw=true "Retailer")
![Consumer](images/consumer.png?raw=true "Consumer")