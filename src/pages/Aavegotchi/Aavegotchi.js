import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { TRAITS_BY_INDEX } from 'utils/constants';
import { diamondContract } from 'utils/contracts';
import formatter from 'utils/formatter';
import { MA_TOKENS } from 'utils/maTokens';
import Web3 from 'web3';

const Style = styled.div`
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
  const { id } = useParams();
  const [aavegotchi, setAavegotchi] = useState();

  useEffect(() => {
    const getSvg = async () => {
      const [details, svg] = await Promise.all([
        diamondContract.methods.getAavegotchi(id).call(),
        diamondContract.methods.getAavegotchiSvg(id).call()
      ]);

      setAavegotchi({
        ...details,
        image: encodeURIComponent(svg)
      });
    }

    getSvg();
  }, [id]);

  if (!aavegotchi)
    return null;

  return (
    <Style>
      <Item center>
        <Image src={`data:image/svg+xml;utf8,${aavegotchi.image}`} alt="aavegotchi" />
      </Item>
      <Item center margin large>{aavegotchi.name} ({aavegotchi.tokenId})</Item>
      <Item>Base Rarity: {aavegotchi.baseRarityScore}</Item>
      <Item>Modified Rarity: {aavegotchi.modifiedRarityScore}</Item>
      <Item>Staked Amount: {formatter.symbol(Web3.utils.fromWei(aavegotchi.stakedAmount), MA_TOKENS[aavegotchi.collateral] ?? aavegotchi.collateral)}</Item>
      {aavegotchi.numericTraits.map((trait, k) => (
        <Item key={k}>{TRAITS_BY_INDEX[k]} {trait}</Item>
      ))}
    </Style>
  )
}

export default Aavegotchi;