import { PriceContext } from "context/price"
import { useCallback, useContext, useMemo } from "react"
import { tokenByAddress } from "utils/tokens";

const usePriceContext = () => {
  const { prices } = useContext(PriceContext);

  const price = useCallback(t => {
    const token = typeof t === 'string' ? tokenByAddress(t) : t;
    return prices[token.symbol]
  }, [prices]);

  const loaded = useMemo(() => !!prices, [prices]);

  return { price, loaded }
}

export default usePriceContext;