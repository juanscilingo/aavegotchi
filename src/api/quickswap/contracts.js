import FACTORY_ABI from "./abis/factory";
import PAIR_ABI from "./abis/pair";
import web3 from "utils/web3";

const FACTORY_CONTRACT_ADDRESS = '0x5757371414417b8c6caad45baef941abc7d3ab32';

export const factoryContract = new web3.eth.Contract(FACTORY_ABI, FACTORY_CONTRACT_ADDRESS);
export const getPairContract = address => new web3.eth.Contract(PAIR_ABI, address);

window.factory = factoryContract.methods;