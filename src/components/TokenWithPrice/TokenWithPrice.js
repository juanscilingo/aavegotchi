import usePriceContext from "hooks/usePriceContext";
import formatter from "utils/formatter";
import { convertFromWeiToTokenDecimals } from "utils/numbers";

const TokenWithPrice = props => {
  const { amount, token } = props;
  const { price, loaded } = usePriceContext();

  if (!loaded)
    return <span>{formatter.token(amount, token)}</span>

  return (
    <span>{formatter.token(amount, token)} ({formatter.usd(convertFromWeiToTokenDecimals(amount, token) * price(token))})</span>
  )
}

export default TokenWithPrice;