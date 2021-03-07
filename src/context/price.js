// import coingecko from "api/coingecko";
import { createContext, useEffect, useState } from "react";
import { getPrices } from 'api/quickswap/quickswap';

const POLLING_INTERVAL = 1000 * 10;

export const PriceContext = createContext();

export const PriceContextProvider = ({ children }) => {
  const [prices, setPrices] = useState();

  useEffect(() => {
    const fetchPrices = async () => {
      const quickswapPrices = await getPrices();
      setPrices(quickswapPrices);
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, POLLING_INTERVAL);
    return (() => clearInterval(interval));
  }, []);

  return (
    <PriceContext.Provider value={{prices, setPrices}}>
      {children}
    </PriceContext.Provider>
  )
}