const fs = require('fs');

let fabricDesc = require('./fabric.json');
fabricDesc.orderer.pemPath = `${__dirname}/` + fabricDesc.orderer.pemPath;
fabricDesc.peers.forEach(function(part, index, theArray){
    theArray[index].pemPath = `${__dirname}/` + theArray[index].pemPath;
});

const key = fs.readFileSync(`${__dirname}/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/cfb4ec5376170b5d21dc835364cbe6cd8f430fc91d817e6cf14cce6dc5f01ff2_sk`, 'utf8');
const cert = fs.readFileSync(`${__dirname}/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/Admin@org1.example.com-cert.pem`, 'utf8');

const configBase = Object.assign(
  { enrollment: { enrollmentID: 'test-client', key, cert } },
  fabricDesc
);

module.exports = {
  onBoarding: Object.assign({
    channelId: 'ttl',
    channelTx: fs.readFileSync(`${__dirname}/channel-artifacts/channel_ttl.tx`)
  }, configBase)
};