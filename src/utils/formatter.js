import { tokenByAddress } from "./tokens";
import { convertTokenDecimals } from "./numbers";

const number = (v, { decimalPlaces, prefix = '', suffix = '' } = {}) => {
  if (decimalPlaces === undefined || decimalPlaces === null)
    decimalPlaces = Math.abs(v) >= 1 || v === 0 ? 2 : 6;

  let decimalMultiplier = Math.pow(10, decimalPlaces);
  const n = Math.round(v * decimalMultiplier) / decimalMultiplier;
  return `${prefix}${n}${suffix ? ` ${suffix}` : ''}` ;
} 

const usd = (v, extra) => `$${number(v, extra)}`;
const symbol = (v, s, extra) => number(v, { suffix: s, ...extra });
const percentage = (v, extra) => `${number(v * 100, extra)}%`;
const trimmedAddress = v => `${v.slice(0, 6)}...${v.slice(-4)}`;
const token = (v, t, extra) => {
  const tk = typeof t === 'string' ? tokenByAddress(t) : t;
  return `${number(convertTokenDecimals(v, tk), { decimalPlaces: 3, ...extra })} ${tk.symbol}`;
}
const date = v => new Date(v).toLocaleDateString();
const datetime =v => new Date(v).toLocaleString();

const formatter = {
  number,
  usd,
  symbol,
  percentage,
  trimmedAddress,
  token,
  date,
  datetime
}

export default formatter;