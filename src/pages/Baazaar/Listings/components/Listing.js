import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { diamondContract } from 'utils/contracts';
import formatter from 'utils/formatter';
import { MA_TOKENS } from 'utils/maTokens';
import Web3 from 'web3';

const StyleLink = styled(Link)`
  width: calc(100% / 4 - 20px);
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 6px;
  box-shadow: var(--box-shadow);
  background: white;
  color: var(--purple-2);

  &:hover {
    color: var(--purple-2);
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
      <Item center>
        <Image src={`data:image/svg+xml;utf8,${image}`} alt="aavegotchi" />
      </Item>
      <Item center margin large>{aavegotchi.name} ({aavegotchi.tokenId})</Item>
      <Item>Price: {formatter.symbol(Web3.utils.fromWei(listing.priceInWei), 'GHST')} ({formatter.usd(parseInt(Web3.utils.fromWei(listing.priceInWei)) * 1.62)})</Item>
      <Item>Base Rarity: {aavegotchi.baseRarityScore}</Item>
      <Item>Modified Rarity: {aavegotchi.modifiedRarityScore}</Item>
      <Item>Staked Amount: {formatter.symbol(Web3.utils.fromWei(aavegotchi.stakedAmount), MA_TOKENS[aavegotchi.collateral] ?? aavegotchi.collateral)}</Item>
    </StyleLink>
  )
}

export default Listing;