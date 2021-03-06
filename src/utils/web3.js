import Web3 from "web3";

const provider = new Web3.providers.HttpProvider(process.env.REACT_APP_DEFAULT_RPC_URL);
const web3 = new Web3(provider);

export default web3;