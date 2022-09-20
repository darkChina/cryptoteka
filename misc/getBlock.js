const Web3 = require('web3');
const web3 = new Web3("wss://goerli.infura.io/ws/v3/ec358f31a9bd42da856f65733bc82272");

web3.eth.getBlock(2566000).then(block => console.log(block));