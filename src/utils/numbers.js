import BigNumber from "bignumber.js";
import { tokenByAddress } from "./tokens";

export const convertTokenDecimals = (value, token) => {
  const t = typeof token === 'string' ? tokenByAddress(token) : token;
  const number = value._isBigNumber ? BigNumber(value._hex) : BigNumber(value);
  return number.times(Math.pow(10, -1 * (t ? t.decimals : 18))).toNumber();
}