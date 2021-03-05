import Web3 from "web3";

const provider = new Web3.providers.HttpProvider('https://rpc-mainnet.maticvigil.com/');
// const provider = window.ethereum;
const web3 = new Web3(provider);

export default web3;