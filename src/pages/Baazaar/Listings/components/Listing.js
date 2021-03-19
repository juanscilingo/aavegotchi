import TokenWithPrice from "components/TokenWithPrice/TokenWithPrice";
import styled from "styled-components";
import { LISTING_CATEGORY_NAME } from "utils/constants";
import { TOKENS } from "utils/tokens";

const Style = styled.a`
  display: block;
  cursor: pointer;
  background: var(--primary-2);
  border-radius: var(--border-radius);
  padding: 10px;
  margin-bottom: 5px;
  font-size: 14px;
`

const Listing = ({ listing }) => {
  return (
    <Style href={`https://aavegotchi.com/baazaar/erc721/${listing.id}`} target="_blank" rel="noopener noreferrer">
      <div>Listing: {listing.id}</div>
      <div>Price: <TokenWithPrice amount={listing.priceInWei} token={TOKENS.GHST} /></div>
      <div>Category: {LISTING_CATEGORY_NAME[listing.category]}</div>
      <div>Date: {new Date(parseInt(listing.timeCreated * 1000)).toLocaleString()}</div>
    </Style>
  )
}

export default Listing;