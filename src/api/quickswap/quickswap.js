import { convertFromWeiToTokenDecimals } from "utils/numbers";
import { TOKENS, tokenByAddress } from "utils/tokens";
import { factoryContract, getPairContract } from "./contracts";

const getPairAddress = (t0, t1) => factoryContract.methods.getPair(t0, t1).call();

const getReserves = async (t0, t1) => {
  const pairAddress = await getPairAddress(t0, t1);
  const pairContract = getPairContract(pairAddress);
  const [reserves, token0, token1] = await Promise.all([
    pairContract.methods.getReserves().call(),
    pairContract.methods.token0().call(),
    pairContract.methods.token1().call(),
  ]);

  const tokenReserves = {
    [token0]: convertFromWeiToTokenDecimals(reserves.reserve0, tokenByAddress(token0)),
    [token1]: convertFromWeiToTokenDecimals(reserves.reserve1, tokenByAddress(token1))
  }

  return [tokenReserves[t0], tokenReserves[t1]];
}

export const getPrice = async (t0, t1) => {
  if (t0 === t1)
    return 1;

  const [reserves0, reserves1] = await getReserves(t0, t1);
  return reserves1 / reserves0;
}

export const executeRoute = async route => {
  let price = 1;
  for (let i = 0; i < route.length - 1; i++)
    price = (await getPrice(TOKENS[route[i]].address, TOKENS[route[i + 1]].address)) * price;
  
  return price;
}

export const getPrices = async () => {
  const prices = await Promise.all(Object.values(TOKENS).map(token => executeRoute(token.route)));

  const result = Object.values(TOKENS).reduce((acc, token, i) => {
    acc[token.symbol] = prices[i];
    return acc;
  }, {});

  return result;
}