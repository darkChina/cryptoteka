const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'changemecrypto2',
    password: 'listentherain88',
    port: 5432,
});

const { sendTransaction } = require("./sendTransaction.js");

client.connect();


client.query(`SELECT * FROM  incoming_transactions3;`, (err, res) => {
    if (!err) {
        for(row of res.rows) {
            if(row.incoming_transaction_hash != null && row.outgoing_transaction_hash == null) {
                sendTransaction(row.client_receiver_wallet);

                // client.query(`
                //     UPDATE incoming_transactions3
                //     SET outgoing_transaction_hash = '${tx.hash}'
                //     WHERE client_sender_wallet = '${tx.from}' AND exchange_receiver_wallet = '${tx.to}'`, (err, res) => {
                //         if(!err) {
                //             console.log(`${res.command} command: success`);
                //         }
                //     });
            }
        }
    } else {
        console.log(err);
    }
});

