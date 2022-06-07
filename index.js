const crypto = require('crypto');
const { read } = require('fs');

const bech32 = require('bech32').bech32
const {readCSV,writeCSV} = require('./util.js');
const table=readCSV("terra_binding.txt");
// console.log(table);
let addresses=[]
for (let row of table){
console.log(row)
const sha256 = crypto.createHash('sha256')
const ripemd160 = crypto.createHash('ripemd160')
const buf = ripemd160.update(sha256.update(Buffer.from(row[0], 'base64')).digest()).digest()
const address = bech32.encode('terra', bech32.toWords(buf))
console.log(address)
addresses.push([row[0],row[1],address,""]);
}

writeCSV("terra_address_binding.txt",addresses);

console.log(addresses)