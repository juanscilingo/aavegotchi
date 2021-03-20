import { tokenByAddress } from "./tokens";
import { convertFromWeiToTokenDecimals } from "./numbers";

export const SHORT_NUMBER_SUFFIXES = [
  '', 
  'K', 
  'M', 
  'B',
  'T',
  'Qa',
  'Qi',
  'Sx',
  'Sp',
  'Oc'
];

const number = (v, { decimalPlaces, prefix = '', suffix = '' } = {}) => {
  if (decimalPlaces === undefined || decimalPlaces === null)
    decimalPlaces = Math.abs(v) >= 1 || v === 0 ? 2 : 6;

  let decimalMultiplier = Math.pow(10, decimalPlaces);
  const n = Math.round(v * decimalMultiplier) / decimalMultiplier;
  return `${prefix}${n}${suffix ? ` ${suffix}` : ''}` ;
} 

const shortNumber = (value, ...rest) => {
  if (value === null || value === undefined) return '';

  /* what tier? (determines suffix) */
  let tier = (Math.log10(value) / 3) | 0;

  /* < 1000 */
  if (!tier) return number(value, ...rest);
  if (tier >= SHORT_NUMBER_SUFFIXES.length) tier = SHORT_NUMBER_SUFFIXES.length - 1;
  /* scale the number */
  let scale = Math.pow(10, tier * 3);
  let scaled = Math.round((value * 100) / scale) / 100;

  return `${number(scaled, ...rest)}${SHORT_NUMBER_SUFFIXES[tier]}`;
};

const usd = (v, extra) => `$${shortNumber(v, extra)}`;
const symbol = (v, s, extra) => shortNumber(v, { suffix: s, ...extra });
const percentage = (v, extra) => `${shortNumber(v * 100, extra)}%`;
const trimmedAddress = v => `${v.slice(0, 6)}...${v.slice(-4)}`;
const token = (v, t, extra) => {
  const tk = typeof t === 'string' ? tokenByAddress(t) : t;
  return `${shortNumber(convertFromWeiToTokenDecimals(v, tk), { decimalPlaces: 3, ...extra })} ${tk.symbol}`;
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