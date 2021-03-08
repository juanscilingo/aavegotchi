import TokenWithPrice from 'components/TokenWithPrice/TokenWithPrice';
import Loader from 'components/UI/Loader/Loader';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LISTING_CATEGORY } from 'utils/constants';
import { diamondContract } from 'utils/contracts';
import { TOKENS } from 'utils/tokens';

const StyleLink = styled(Link)`
  width: calc(100% / 4 - 20px);
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 6px;
  box-shadow: var(--box-shadow);
  background: white;
  color: var(--primary-2);

  &:hover {
    color: var(--primary-2);
  }
  
  @media(max-width: 1024px) {
    width: calc(100% / 3 - 20px);
  }
  @media(max-width: 768px) {
    width: calc(100% / 2 - 20px);
  }
  @media(max-width: 550px) {
    width: calc(100%);
  }
`

const Image = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
`

const Item = styled.div`
  text-align: ${props => props.center ? 'center' : 'left'};
  margin-bottom: ${props => props.margin ? '15px' : '5px'};
  margin-top: 5px;
  font-size: ${props => props.large ? '18px' : '14px'};
  font-weight: ${props => props.large ? '600' : '500'};
`

const Details = ({ aavegotchi, listing }) => {
  switch (parseInt(aavegotchi.status)) {
    case LISTING_CATEGORY.aavegotchi:
      return (
        <>
          <Item center margin large>{aavegotchi.name ? aavegotchi.name : 'Aavegotchi'} ({aavegotchi.tokenId})</Item>
          <Item>Price: <TokenWithPrice amount={listing.priceInWei} token={TOKENS.GHST} /></Item>
          <Item>Base Rarity: {aavegotchi.baseRarityScore}</Item>
          <Item>Modified Rarity: {aavegotchi.modifiedRarityScore}</Item>
          <Item>Staked Amount: <TokenWithPrice amount={aavegotchi.stakedAmount} token={aavegotchi.collateral} /></Item>
        </>
      )
    case LISTING_CATEGORY['open-portal']:
      return (
        <>
          <Item center margin large>Open Portal ({aavegotchi.tokenId})</Item>
          <Item>Price: <TokenWithPrice amount={listing.priceInWei} token={TOKENS.GHST} /></Item>
        </>
      )
    case LISTING_CATEGORY.portal:
      return (
        <>
          <Item center margin large>Unopened Portal ({aavegotchi.tokenId})</Item>
          <Item>Price: <TokenWithPrice amount={listing.priceInWei} token={TOKENS.GHST} /></Item>
        </>
      )
    default:
      return null;
  }
}

const Listing = props => {
  const listing = props.listing.listing_;
  const aavegotchi = props.listing.aavegotchiInfo_;
  const [image, setImage] = useState();

  useEffect(() => {
    const getSvg = async () => {
      const svg = await diamondContract.methods.getAavegotchiSvg(aavegotchi.tokenId).call();
      setImage(encodeURIComponent(svg));
    }

    getSvg();
  }, [aavegotchi]);

  if (!image)
    return null;

  return (
    <StyleLink to={`/baazaar/erc721/${listing.listingId}`}>
      {image ? (
        <Item center>
          <Image src={`data:image/svg+xml;utf8,${image}`} alt="aavegotchi" />
        </Item>
      ) : (
        <Loader />
      )}
      <Details aavegotchi={aavegotchi} listing={listing} />
    </StyleLink>
  )
}

export default Listing;