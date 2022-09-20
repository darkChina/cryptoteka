const Web3 = require('web3');



async function sendTransaction(clientReceiverWallet) {

    const web3 = new Web3("wss://goerli.infura.io/ws/v3/ec358f31a9bd42da856f65733bc82272");
  
    const signer = web3.eth.accounts.privateKeyToAccount("3158aee441cc2f7ab6549d426ca26c806a9b80aa2f99cb45fa4c4c0ba674e403");
    web3.eth.accounts.wallet.add(signer);
  
    var limit = web3.eth.estimateGas({
      from: signer.address, 
      to: clientReceiverWallet,
      value: web3.utils.toWei("0.0000123")
      }).then(console.log);
      
    const tx = {
      from: signer.address,
      to: clientReceiverWallet,
      value: web3.utils.numberToHex(web3.utils.toWei('0.0000123', 'ether')),
      gas: web3.utils.toHex(limit),
      nonce: web3.eth.getTransactionCount(signer.address),
      maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei('2', 'gwei')),
      chainId: 5,                  
      type: 0x2
    };
  
    signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey)
  
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log);  
  }


  module.exports.sendTransaction = sendTransaction;