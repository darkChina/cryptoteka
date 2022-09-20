const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'changemecrypto2',
    password: 'listentherain88',
    port: 5432,
  });

const cors = require("cors");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const Web3 = require('web3');
const web3 = new Web3("wss://goerli.infura.io/ws/v3/ec358f31a9bd42da856f65733bc82272");
  
app.use(bodyParser.json());
app.use(cors()); 
 
client.connect();

app.post('/tx', (req, response) => {
    const account = web3.eth.accounts.create();
    client.query(`INSERT INTO exchange_receiver_wallets (account, private_key, balance) VALUES ('${account.address}', '${account.privateKey}', 0);`);
    client.query(`INSERT INTO pending_transactions (
        base_currency, 
        change_currency, 
        client_sender_wallet,
        client_receiver_wallet, 
        exchange_receiver_wallet) VALUES (
            '${req.body.baseCurrency}', 
            '${req.body.changeCurrency}', 
            '${req.body.clientSenderWallet}',
            '${req.body.clientReceiverWallet}', 
            '${account.address}');`, (err, res) => {
                if(!err) {
                    response.send(JSON.stringify(account.address));
                } else {
                    response.send("db error code: " + err.code)
                    console.log(err);
                };
    //client.end();
    });
    console.log(req.body); // for debugging
});

app.listen(port, () => {
    console.log(`REST server is up on port ${port}`);
});










 