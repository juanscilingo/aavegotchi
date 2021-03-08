import TokenWithPrice from 'components/TokenWithPrice/TokenWithPrice';
import Loader from 'components/UI/Loader/Loader';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TRAITS_BY_INDEX } from 'utils/constants';
import { diamondContract } from 'utils/contracts';

const Style = styled.div`
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

const Aavegotchi = props => {
  const { aavegotchi } = props;
  const [image, setImage] = useState();

  useEffect(() => {
    const getSvg = async () => {
      const svg = await diamondContract.methods.getAavegotchiSvg(aavegotchi.tokenId).call();
      setImage(encodeURIComponent(svg));
    }

    getSvg();
  }, [aavegotchi]);

  if (!aavegotchi)
    return null;

  return (
    <Style>
      {image ? (
        <Item center>
          <Image src={`data:image/svg+xml;utf8,${image}`} alt="aavegotchi" />
        </Item>
      ): (
        <Loader />
      )}
      <Item center margin large>{aavegotchi.name} ({aavegotchi.tokenId})</Item>
      <Item>Base Rarity: {aavegotchi.baseRarityScore}</Item>
      <Item>Modified Rarity: {aavegotchi.modifiedRarityScore}</Item>
      <Item>Staked Amount: <TokenWithPrice amount={aavegotchi.stakedAmount} token={aavegotchi.collateral} /></Item>
      {aavegotchi.numericTraits.map((trait, k) => (
        <Item key={k}>{TRAITS_BY_INDEX[k]} {trait}</Item>
      ))}
    </Style>
  )
}

export default Aavegotchi;