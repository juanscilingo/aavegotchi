import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { LISTING_CATEGORY } from "utils/constants";
import { diamondContract } from "utils/contracts";
import formatter from "utils/formatter";
import Web3 from "web3";
import ClosedPortal from "./components/ClosedPortal";
import Portal from "./components/Portal";
import Aavegotchi from "./components/Aavegotchi";

const Style = styled.div`

`


const ListingInfo = styled.div`

`

const TYPE_COMPONENT = {
  [LISTING_CATEGORY.aavegotchi]: Aavegotchi,
  [LISTING_CATEGORY["open-portal"]]: Portal,
  [LISTING_CATEGORY.portal]: ClosedPortal
}

const ERC721 = props => {
  const { id } = useParams();
  const [details, setDetails] = useState();

  useEffect(() => {
    const getDetails = async() => {
      const { listing_: listing, aavegotchiInfo_: aavegotchi } = await diamondContract.methods.getAavegotchiListing(id).call();
      setDetails({ listing, aavegotchi });
    }

    getDetails();
  }, [id]);

  if (!details)
    return null;

  const { listing, aavegotchi } = details;
  const DetailsComponent = TYPE_COMPONENT[aavegotchi.status];

  return (
    <Style>
      <h4>Listing Info</h4>
      <ListingInfo>
        <div>ID: {aavegotchi.tokenId}</div>
        <div>Price: {formatter.symbol(Web3.utils.fromWei(listing.priceInWei), 'GHST')} ({formatter.usd(parseInt(Web3.utils.fromWei(listing.priceInWei)) * 1.62)})</div>
        <div>Seller: {listing.seller}</div>
        <a href={`https://aavegotchi.com/baazaar/erc721/${id}`} target="_blank" rel="noopener noreferrer">View in app</a>
      </ListingInfo>
      <DetailsComponent {...details} />
    </Style>
  )
}

export default ERC721;