import { Link, Route, Switch, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { LISTING_CATEGORY } from 'utils/constants';
import ERC721 from './ERC721/ERC731';
import Listings from './Listings/Listings';

const Style = styled.div`

`

const Navigation = styled.div`
  margin: 15px 0px 30px 0px;
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

  ${props => props.$active && active};
`

const Baazaar = props => {
  const params = useParams();
  const category = LISTING_CATEGORY[params.category] ?? LISTING_CATEGORY.aavegotchi;

  return (
    <Style>
      <Navigation>
        <NavLink to="/baazaar/aavegotchi" $active={category === LISTING_CATEGORY.aavegotchi}>Aavegotchis</NavLink>
        <NavLink to="/baazaar/portal" $active={category === LISTING_CATEGORY.portal}>Closed Portals</NavLink>
        <NavLink to="/baazaar/open-portal" $active={category === LISTING_CATEGORY['open-portal']}>Open Portals</NavLink>
      </Navigation>
      <Switch>
        <Route path="/baazaar" component={Listings} exact />
        <Route path="/baazaar/:category?" component={Listings} exact/>
        <Route path="/baazaar/erc721/:id" component={ERC721} />
      </Switch>
    </Style>
  )
}

export default Baazaar;