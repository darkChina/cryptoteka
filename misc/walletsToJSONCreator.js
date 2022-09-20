const Web3 = require('web3');
const web3 = new Web3("wss://goerli.infura.io/ws/v3/ec358f31a9bd42da856f65733bc82272");
const fs = require("fs");

fs.appendFileSync("wallets.json", "[\n");

for(let i = 0; i < 20; i++) {
    const account = web3.eth.accounts.create("1234567");
    if(i < 19) {
        fs.appendFileSync("wallets.json", 
        `{ "address": "${account.address}", "privateKey": "${account.privateKey}" }, \n`)
    } else {
        fs.appendFileSync("wallets.json", 
        `{ "address": "${account.address}", "privateKey": "${account.privateKey}" } \n`)
    }
    
}

fs.appendFileSync("wallets.json", "]");
