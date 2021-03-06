import { useEffect, useState } from "react";
import styled from "styled-components";
import { calculateBRS } from "utils/aavegotchi";
import { TRAITS_BY_INDEX } from "utils/constants";
import { diamondContract } from "utils/contracts";
import formatter from "utils/formatter";

const Style = styled.div`

`

const Aavegotchis = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Aavegotchi = styled.div`
  width: calc(100% / 5 - 10px);
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
  box-shadow: var(--box-shadow);
  background: white;
  color: var(--primary-2);
  
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
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
`

const ImageContainer = styled.div`
  text-align: center;
`

const Trait = styled.div`
  font-size: 14px;
  font-weight: 500;
`

const Total = styled.div`
  margin-top: 10px;
  font-weight: 600;
`

const Portal = props => {
  const { aavegotchi } = props;
  const [details, setDetails] = useState();

  useEffect(() => {
    const getDetails = async() => {
      const [aavegotchis, images]  = await Promise.all([
        diamondContract.methods.portalAavegotchiTraits(aavegotchi.tokenId).call(),
        diamondContract.methods.portalAavegotchisSvg(aavegotchi.tokenId).call()
      ]);

      setDetails({
        aavegotchis,
        images: images.map(encodeURIComponent)
      });
    }

    getDetails();
  }, [aavegotchi.tokenId]);

  if (!details)
    return null;

  return (
    <Style>
      <h4>Aavegotchis</h4>
      <Aavegotchis>
        {details.aavegotchis.map((aavegotchi, i) => (
          <Aavegotchi key={i}>
            <ImageContainer>
              <Image src={`data:image/svg+xml;utf8,${details.images[i]}`} alt="aavegotchi" />
            </ImageContainer>
            <Trait>Minimum Stake: {formatter.token(aavegotchi.minimumStake, aavegotchi.collateralType, { decimalPlaces: 6 })}</Trait>
            {aavegotchi.numericTraits.map((trait, k) => (
              <Trait key={k}>{TRAITS_BY_INDEX[k]} {trait}</Trait>
            ))}
            <Total>Base Rarity Score: {calculateBRS(aavegotchi.numericTraits)}</Total>
          </Aavegotchi>
        ))}
      </Aavegotchis>
    </Style>
  )
}

export default Portal;