import env from "config/env";
import Web3 from "web3";

const provider = new Web3.providers.HttpProvider(env.DEFAULT_RPC_URL);
const web3 = new Web3(provider);

export default web3;