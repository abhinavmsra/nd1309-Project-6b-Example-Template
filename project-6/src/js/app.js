const ROLES = {
    farmer: 1,
    distributor: 2,
    retailer: 3,
    consumer: 4
};

App = {
    web3Provider: null,
    web3: null,
    networkID: null,
    role: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();
    },

    initWeb3: async function () {
        if (window.ethereum) {
            App.web3 = new Web3(Web3.givenProvider);  
            await window.ethereum.enable(); // get permission to access accounts
        } else {
            console.warn('No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live');
            App.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
        }

        await App.getMetaskAccountID();
        await App.initSupplyChain();
        await App.initRole();
    },

    getMetaskAccountID: async function () {
        App.networkID = await App.web3.eth.net.getId();
        App.metamaskAccountID = (await App.web3.eth.getAccounts())[0];
    },

    initRole: async function () {
        App.initAsFarmer();
        if(App.role) { return; }

        App.initAsDistributor();
        if(App.role) { return; }

        App.initAsRetailer();
        if(App.role) { return; }

        App.initAsConsumer();
        if(App.role) { return; }
    },

    initAsFarmer: async function () {
        const result = await App.contracts.SupplyChain.methods.isFarmer(App.metamaskAccountID).call();
        if (result === true) { 
            App.role = ROLES.farmer; 
        } 
    },

    initAsDistributor: async function () {
        const result = await App.contracts.SupplyChain.methods.isDistributor(App.metamaskAccountID).call();
        if (result === true) { 
            App.role = ROLES.distributor; 
        }
    },

    initAsRetailer: async function () {
        const result = await App.contracts.SupplyChain.methods.isRetailer(App.metamaskAccountID).call();
        if (result === true) { 
            App.role = ROLES.retailer; 
        }
    },

    initAsConsumer: async function () {
        const result = await App.contracts.SupplyChain.methods.isConsumer(App.metamaskAccountID).call();
        if (result === true) { 
            App.role = ROLES.consumer; 
        } 
    },

    initSupplyChain: async function () {
        const jsonSupplyChain = await $.getJSON('../../build/contracts/SupplyChain.json');
        const { abi, networks } = jsonSupplyChain;
        const deployedNetwork = networks[App.networkID];
        
        App.contracts.SupplyChain = new App.web3.eth.Contract(abi, deployedNetwork.address);

        App.fetchEvents();
        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);
        
        switch(processId) {
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.shipItem(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8:
                return await App.purchaseItem(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
            }
    },

    harvestItem: async function(event) {
        event.preventDefault();
        const { harvestItem } = App.contracts.SupplyChain.methods;

        if (App.role != ROLES.farmer) {
            alert("Must be a farmer to harvest");
            return;
        }

        const result = await harvestItem(
            document.querySelector("#upc").value, 
            App.metamaskAccountID, 
            document.querySelector("#originFarmName").value, 
            document.querySelector("#originFarmInformation").value,
            document.querySelector("#originFarmLatitude").value,
            document.querySelector("#originFarmLongitude").value,
            document.querySelector("#productNotes").value,
        ).send({from: App.metamaskAccountID});

        console.log('harvestItem',result);
        App.fetchItemBufferOne();
        App.fetchItemBufferTwo();
    },

    processItem: async function (event) {
        event.preventDefault();
        const { processItem } = App.contracts.SupplyChain.methods;

        if (App.role != ROLES.farmer) {
            alert("Must be a farmer to process");
            return;
        }

        const result = await processItem(document.querySelector("#upc").value).send({from: App.metamaskAccountID});

        console.log('processItem',result);
        App.fetchItemBufferOne();
        App.fetchItemBufferTwo();
    },
    
    packItem: async function (event) {
        event.preventDefault();
        const { packItem } = App.contracts.SupplyChain.methods;
        if (App.role != ROLES.farmer) {
            alert("Must be a farmer to pack");
            return;
        }

        const result = await packItem(document.querySelector("#upc").value).send({from: App.metamaskAccountID});
        console.log('packItem',result);
        App.fetchItemBufferOne();
        App.fetchItemBufferTwo();
    },

    sellItem: async function (event) {
        event.preventDefault();
        const { sellItem } = App.contracts.SupplyChain.methods;
        if (App.role != ROLES.farmer) {
            alert("Must be a farmer to sell");
            return;
        }

        const result = await sellItem(
            document.querySelector("#upc").value,
            App.web3.utils.toWei(document.querySelector("#productPrice").value)
        ).send({from: App.metamaskAccountID});
        console.log('sellItem',result);
        App.fetchItemBufferOne();
        App.fetchItemBufferTwo();
    },

    buyItem: async function (event) {
        event.preventDefault();
        const { buyItem } = App.contracts.SupplyChain.methods;
        if (App.role != ROLES.distributor) {
            alert("Must be a distributor to buy");
            return;
        }
        await App.fetchItemBufferTwo();

        const result = await buyItem(
            document.querySelector("#upc").value
        ).send({
            from: App.metamaskAccountID, 
            value: App.web3.utils.toWei(document.querySelector("#productPrice").value)
        });
        console.log('buyItem',result);

        App.fetchItemBufferOne();
        App.fetchItemBufferTwo();
    },

    shipItem: async function (event) {
        event.preventDefault();
        const { shipItem } = App.contracts.SupplyChain.methods;
        if (App.role != ROLES.distributor) {
            alert("Must be a distributor to ship");
            return;
        }

        const result = await shipItem(document.querySelector("#upc").value).send({from: App.metamaskAccountID});
        console.log('shipItem',result);

        App.fetchItemBufferOne();
        App.fetchItemBufferTwo();
    },

    receiveItem: async function (event) {
        event.preventDefault();
        const { receiveItem } = App.contracts.SupplyChain.methods;
        if (App.role != ROLES.retailer) {
            alert("Must be a retailer to receive");
            return;
        }

        const result = await receiveItem(document.querySelector("#upc").value).send({from: App.metamaskAccountID});
        console.log('receiveItem',result);

        App.fetchItemBufferOne();
        App.fetchItemBufferTwo();
    },

    purchaseItem: async function (event) {
        event.preventDefault();
        const { purchaseItem } = App.contracts.SupplyChain.methods;
        if (App.role != ROLES.consumer) {
            alert("Must be a consumer to purchase");
            return;
        }

        const result = await purchaseItem(document.querySelector("#upc").value).send({from: App.metamaskAccountID});
        console.log('purchaseItem',result);

        App.fetchItemBufferOne();
        App.fetchItemBufferTwo();
    },

    fetchItemBufferOne: async function () {
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        const result = await App.contracts.SupplyChain.methods.fetchItemBufferOne(App.upc).call();
        App.updateFarmFields(result);
        console.log('fetchItemBufferOne', result);
    },

    fetchItemBufferTwo: async function () {
        const result = await App.contracts.SupplyChain.methods.fetchItemBufferTwo(App.upc).call();
        App.updateProductFields(result);
        console.log('fetchItemBufferTwo', result);
    },

    fetchEvents: async function () {
        App.contracts.SupplyChain.events.allEvents(function(err, log) {
            if(err) { 
                console.log(err.message); 
                return; 
            }

            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
    },

    updateFarmFields: function(result) {
        document.querySelector("#sku").value = result.itemSKU;
        document.querySelector("#upc").value = result.itemUPC;
        document.querySelector("#ownerID").value = result.ownerID;
        document.querySelector("#originFarmerID").value = result.originFarmerID;
        document.querySelector("#originFarmName").value = result.originFarmName;
        document.querySelector("#originFarmInformation").value = result.originFarmInformation;
        document.querySelector("#originFarmLatitude").value = result.originFarmLatitude;
        document.querySelector("#originFarmLongitude").value = result.originFarmLongitude;
    },

    updateProductFields: function(result) {
        document.querySelector("#productNotes").value = result.productNotes;
        document.querySelector("#productPrice").value = App.web3.utils.fromWei(result.productPrice);
        document.querySelector("#distributorID").value = result.distributorID;
        document.querySelector("#retailerID").value = result.retailerID;
        document.querySelector("#consumerID").value = result.consumerID;
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});