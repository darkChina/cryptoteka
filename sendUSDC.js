const Web3 = require('web3');
const web3 = new Web3("wss://goerli.infura.io/ws/v3/ec358f31a9bd42da856f65733bc82272");
var Tx = require('ethereumjs-tx').Transaction;

const contractAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
let toAddress = "0x7FB1FD8AD0A5D30fBD7dCE092CD63061Cc1f9c69";
let fromAddress = "0x127A3040dadd13EF3C2cbc9E456A142159C2870D";
const USDCabi = require("./USDCabi.json");
const privateKey = "3158aee441cc2f7ab6549d426ca26c806a9b80aa2f99cb45fa4c4c0ba674e403";



let contract = new web3.eth.Contract(USDCabi, contractAddress, { from: fromAddress })
let amount = web3.utils.toHex(web3.utils.toWei("1", "mwei"));



const sendToken = async () => {
   let txObj = {
       gas: web3.utils.toHex(100000),
       "to": contractAddress,
       "value": "0x00",
       "data": await contract.methods.transfer(toAddress, amount).encodeABI(),
       "from": fromAddress
   }

   web3.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
       if (err) {
           return console.log(err);
       } else {
           return web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
               if (err) {
                   console.log(err)
               } else {
                   console.log(res)
               }
           });
       }
   });

   console.log(amount)
}

sendToken();



