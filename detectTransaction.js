const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'changemecrypto2',
    password: 'listentherain88',
    port: 5432,
  });

const Web3 = require('web3');
const web3 = new Web3("wss://goerli.infura.io/ws/v3/ec358f31a9bd42da856f65733bc82272");

client.connect();

const getPendingTransactions = async() => {
    const transactions = await client.query(`
        SELECT * FROM pending_transactions`);
    return transactions.rows;
}
let i = 0;

const work = () => {
    
    getPendingTransactions().then(transactions => {
        for(transaction of transactions) {
            detectTransaction(transaction)
        }
    });
}


setInterval(() => work(), 2000);


function detectTransaction(pendingTransaction) {
    web3.eth.getBlockNumber().then(blockNum => {
        web3.eth.getBlock(blockNum).then(block => {           
            if(block != null) {
                for(transaction of block.transactions) {
                    web3.eth.getTransaction(transaction).then(tx => {                        
                        if(tx != null) {
                            if(tx.to == pendingTransaction.exchange_receiver_wallet) {
                                client.query(`INSERT INTO confirmed_transactions (
                                    base_currency, 
                                    change_currency, 
                                    client_sender_wallet,
                                    client_receiver_wallet, 
                                    exchange_receiver_wallet,
                                    incoming_transaction_hash,
                                    base_currency_amount) VALUES (
                                        '${pendingTransaction.base_currency}', 
                                        '${pendingTransaction.change_currency}', 
                                        '${pendingTransaction.client_sender_wallet}',
                                        '${pendingTransaction.client_receiver_wallet}', 
                                        '${pendingTransaction.exchange_receiver_wallet}',
                                        '${tx.hash}',
                                        '${tx.value}');`, (err, res) => {
                                            if(!err) {
                                                console.log(res.command);
                                            } else {
                                                console.log(err);
                                            }
                                });

                                client.query(`DELETE FROM pending_transactions WHERE exchange_receiver_wallet = '${pendingTransaction.exchange_receiver_wallet}';`, (err, res) => {
                                    if(!err) {
                                        console.log(res.command);
                                    } 
                                });
                            }
                        }
                    });
                }
            }
        });
    });
}
