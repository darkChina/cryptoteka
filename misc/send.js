const Web3 = require("web3");

async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3("wss://goerli.infura.io/ws/v3/ec358f31a9bd42da856f65733bc82272");

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount("3158aee441cc2f7ab6549d426ca26c806a9b80aa2f99cb45fa4c4c0ba674e403");
  web3.eth.accounts.wallet.add(signer);

  // Estimatic the gas limit
  var limit = web3.eth.estimateGas({
    from: signer.address, 
    to: "0x7FB1FD8AD0A5D30fBD7dCE092CD63061Cc1f9c69",
    value: web3.utils.toWei("0.001")
    }).then(console.log);
    
  // Creating the transaction object
  const tx = {
    from: signer.address,
    to: "0x7FB1FD8AD0A5D30fBD7dCE092CD63061Cc1f9c69",
    value: web3.utils.numberToHex(web3.utils.toWei('0.001', 'ether')),
    gas: web3.utils.toHex(limit),
    nonce: web3.eth.getTransactionCount(signer.address),
    maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei('2', 'gwei')),
    chainId: 5,                  
    type: 0x2
  };

  signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey)
  console.log("Raw transaction data: " + signedTx.rawTransaction)

  // Sending the transaction to the network
  const receipt = await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://goerli.etherscan.io/tx/${txhash}`);
    });
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);

}

main();