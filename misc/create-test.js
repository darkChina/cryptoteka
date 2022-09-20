const Web3 = require('web3');
const web3 = new Web3("wss://goerli.infura.io/ws/v3/ec358f31a9bd42da856f65733bc82272");
const account = web3.eth.accounts.create();
// const wallet = web3.eth.accounts.wallet.create(4)

// console.log(wallet);
// web3.eth.sendTransaction({
//     from: "0x127A3040dadd13EF3C2cbc9E456A142159C2870D",
//     gasPrice: "20000000000",
//     gas: "21000",
//     to: '0x522A080EFa03A0808139Eb9BF45dF22CA88F1112',
//     value: "10000000000000",
//     data: ""
// }, 'abc12345test!').then(console.log);


web3.eth.sendTransaction({
    from: '0x127A3040dadd13EF3C2cbc9E456A142159C2870D',
    to: '0x522A080EFa03A0808139Eb9BF45dF22CA88F1112',
    value: '10000000000000'
})
.then(receip => console.log(receip));




//0xe8F74a2cEFc117e2679d13F13d35b93876571338
//0xb09653f0f0b2a3faa43497a983d167c59eeaf3f4b1aa5df5911e2c80bb77b7ed
//scrap token black outer ignore voyage rebuild fence peace fork vintage mixture
