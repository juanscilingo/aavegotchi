import BigNumber from "bignumber.js";
import { tokenByAddress } from "./tokens";

export const convertTokenDecimals = (value, token) => {
  const t = typeof token === 'string' ? tokenByAddress(token) : token;
  const number = value._isBigNumber ? BigNumber(value._hex) : BigNumber(value);
  return number.times(Math.pow(10, -1 * (t ? t.decimals : 18))).toNumber();
}

const avg = (values, accessor) => {
  if (values.length === 0)
    return null;

  const accessor_fn = typeof accessor === 'function' ? accessor: v => v[accessor];
  const total = values.reduce((acc, v) => acc + accessor_fn(v), 0);

  return total / values.length;
}

export const AGGREGATION_FN = {
  avg
}