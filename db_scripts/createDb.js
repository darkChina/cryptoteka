const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'changemecrypto',
    password: 'listentherain88',
    port: 5432,
  });

  client.connect();

  const createDb = function() {
    client.query("CREATE DATABASE changemecrypto2 ENCODING 'UTF8'", (err, res) => {
        console.log(err, res);
        client.end();
      });
}

createDb();