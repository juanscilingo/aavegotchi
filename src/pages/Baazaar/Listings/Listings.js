import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { LISTING_CATEGORY, LISTING_TYPE } from "utils/constants";
import { diamondContract } from "utils/contracts";
import Listing from "./components/Listing";

const Style = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Listings = props => {
  const params = useParams();
  const category = LISTING_CATEGORY[params.category] ?? LISTING_CATEGORY.aavegotchi;
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const getListings = async() => {
      let listings = await diamondContract.methods.getAavegotchiListings(category, LISTING_TYPE.listed, 10).call();
      setListings(listings);
    }

    getListings();
  }, [category]);

  if (!listings)
    return null;

  return (
    <Style>
      {listings.map(listing => (
        <Listing key={listing.listing_.listingId} listing={listing} /> 
      ))}
    </Style>
  )
}

export default Listings;