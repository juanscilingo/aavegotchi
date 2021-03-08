import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import ERC721 from './ERC721/ERC731';
import Listings from './Listings/Listings';
import Purchases from './Purchases/Purchases';

const Style = styled.div`

`

const Baazaar = props => {

  return (
    <Style>
      <Switch>
        <Route path="/baazaar" component={Listings} exact />
        <Route path="/baazaar/purchases/:category?" component={Purchases} exact/>
        <Route path="/baazaar/listings/:category?" component={Listings} exact/>
        <Route path="/baazaar/erc721/:id" component={ERC721} />
      </Switch>
    </Style>
  )
}

export default Baazaar;