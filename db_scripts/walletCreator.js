const Web3 = require('web3');
const web3 = new Web3("wss://goerli.infura.io/ws/v3/ec358f31a9bd42da856f65733bc82272");


const { Client } = require('pg');
const dbConfig = require("./dbConfig.json");

const client = new Client(dbConfig);

client.connect();

(() => {
  client.query("CREATE TABLE changemecrypto2.public.exchange_receiver_wallets (id SERIAL PRIMARY KEY,account TEXT,private_key TEXT, balance FLOAT8);", (err, res) => {
        if(!err) {
            // for(let i = 0; i < 20; i++) {
            //     const account = web3.eth.accounts.create("1234567");
            //     client.query(`INSERT INTO receiver_wallets (account, private_key) VALUES ('${account.address}', '${account.privateKey}');`);
            // }
            console.log(`receiver_wallets table is created in ${dbConfig.database}`);
            // console.log("20 accounts were added to receiver_wallets table");
            
        } else { 
            console.log(err);
        }
      });
})();



