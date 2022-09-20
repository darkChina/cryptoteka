const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'changemecrypto2',
    password: 'listentherain88',
    port: 5432,
  });

client.connect();

const createTransactionsTable = function() {
  client.query("CREATE TABLE changemecrypto2.public.confirmed_transactions (id SERIAL PRIMARY KEY,base_currency TEXT,change_currency TEXT,client_sender_wallet TEXT,client_receiver_wallet TEXT,exchange_receiver_wallet TEXT,incoming_transaction_hash TEXT, base_currency_amount FLOAT8);", (err, res) => {
    console.log(err, res);
        client.end();
      });
}

createTransactionsTable();