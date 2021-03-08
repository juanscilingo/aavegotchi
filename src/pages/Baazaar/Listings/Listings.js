import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import styled, { css } from 'styled-components';
import { LISTING_CATEGORY, LISTING_TYPE } from "utils/constants";
import { diamondContract } from "utils/contracts";
import Listing from "./components/Listing";

const Style = styled.div`
`

const Navigation = styled.div`
  margin: 15px 0px 30px 0px;

  @media(max-width: 550px) {
    display: flex;
    justify-content: space-between;
  }
`

const active = css`
  background: var(--pink);
  
  &:hover {
    color: white;
  }

`

const NavLink = styled(Link)`
  font-size: 16px;
  padding: 10px 15px;
  margin-right: 15px;
  border-radius: 6px;

  @media(max-width: 550px) {
    font-size: 15px;
    margin-right: 10px;
    padding: 8px 12px;
  }

  ${props => props.$active && active};
`

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Listings = props => {
  const params = useParams();
  const category = LISTING_CATEGORY[params.category] ?? LISTING_CATEGORY.aavegotchi;
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const getListings = async() => {
      let listings = await diamondContract.methods.getAavegotchiListings(category, LISTING_TYPE.listed, 90).call();
      setListings(listings);
    }

    getListings();
  }, [category]);

  if (!listings)
    return null;

  return (
    <Style>
      <Navigation>
        <NavLink to="/baazaar/listings/aavegotchi" $active={category === LISTING_CATEGORY.aavegotchi}>Aavegotchis</NavLink>
        <NavLink to="/baazaar/listings/portal" $active={category === LISTING_CATEGORY.portal}>Closed Portals</NavLink>
        <NavLink to="/baazaar/listings/open-portal" $active={category === LISTING_CATEGORY['open-portal']}>Open Portals</NavLink>
      </Navigation>
      <List>
        {listings.map(listing => (
          <Listing key={listing.listing_.listingId} listing={listing} /> 
        ))}
      </List>
    </Style>
  )
}

export default Listings;