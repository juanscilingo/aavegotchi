import Gotchi from "components/Gotchi/Gotchi";
import Badge from "components/UI/Badge/Badge";
import styled from "styled-components";
import { LISTING_CATEGORY_NAME } from "utils/constants";
import formatter from "utils/formatter";
import { convertFromWeiToTokenDecimals } from "utils/numbers";
import { TOKENS } from "utils/tokens";

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: var(--primary-2);
  border-radius: var(--border-radius);
  padding: 10px;
  font-size: 14px;
  position: relative;
  width: calc(100% / 5 - 15px);
  margin-bottom: 15px;
  margin-right: 15px;
  height: 200px;

  &:hover {
    color: white;
    box-shadow: var(--box-shadow);
  }

  @media(max-width: 1280px) {
    width: calc(100% / 4 - 15px);
  }
  @media(max-width: 1050px) {
    width: calc(100% / 3 - 15px);
  }
  @media(max-width: 800px) {
    width: calc(100% / 2 - 15px);
  }
  @media(max-width: 550px) {
    width: 100%;
    margin-right: 0px;
  }
`

const ListingId = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  color: lightgray;
`

const Price = styled.div`
  position: absolute;
  bottom: 6px;
  right: 8px;
  font-size: 16px;
  font-weight: 500;
`

const Category = styled(Badge)`
  padding: 2px 4px;
  font-size: 12px;
  position: absolute;
  top: 10px;
  left: 10px;
`

const TimeCreated = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 10px;
  color: lightgray;
  font-style: italic;
`

const Image = styled(Gotchi)`
  width: 120px;
  height: 120px;

`

const LinkWrapper = styled.a`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
`

const OpenPortal = props => {

}

const COLORS = {
  0: 'orange',
  2: 'purple',
  3: 'secondary'
}

const Listing = ({ listing }) => {
  return (
    <Style>
      <ListingId>#{listing.id}</ListingId>
      <Price>{formatter.token(listing.priceInWei, TOKENS.GHST)}</Price>
      <Category color={COLORS[listing.category]}>{LISTING_CATEGORY_NAME[listing.category]}</Category>
      <TimeCreated>{new Date(parseInt(listing.timeCreated * 1000)).toLocaleString()}</TimeCreated>
      <Image id={listing.tokenId}/>
      <LinkWrapper href={`https://aavegotchi.com/baazaar/erc721/${listing.id}`} target="_blank" rel="noopener noreferrer"></LinkWrapper>
    </Style>
  )
}

export default Listing;