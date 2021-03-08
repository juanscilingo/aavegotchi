import DIAMOND_ABI from "./abis/diamond_abi";
import { DIAMOND_CONTRACT_ADDRESS } from "./addresses";
import web3 from "./web3";

export const diamondContract = new web3.eth.Contract(DIAMOND_ABI, DIAMOND_CONTRACT_ADDRESS);
window.c = diamondContract;
window.log = cm => cm.call().then(console.log);