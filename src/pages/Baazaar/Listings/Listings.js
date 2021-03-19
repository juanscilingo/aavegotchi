import { erc721Listings } from "api/aavegotchi-subgraph/queries/erc721Listings";
import Emote from "components/Emote/Emote";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll";
import useDebouncedCallback from "hooks/useDebouncedCallback";
import useQuery from "hooks/useQuery";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Filters, { PARSED_INITIAL_FILTERS } from "./components/Filters";
import Listing from "./components/Listing";

const Style = styled.div`
`

const List = styled(InfiniteScroll)`
`

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  color: lightgray;

  img {
    margin-left: 8px;
  }
`

const PAGE_SIZE = 100;

const Listings = props => {
  const [listings, setListings] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [variables, setVariables] = useState({
    first: PAGE_SIZE,
    skip: 0,
    where: PARSED_INITIAL_FILTERS,
    orderBy: 'timeCreated',
    orderDirection: 'desc'
  });

  const { data, fetching } = useQuery(erc721Listings, variables);

  const onFiltersChanged = useDebouncedCallback((newFilters, sorting) => {
    setListings([]);
    setEndReached(false);
    setVariables({
      first: PAGE_SIZE,
      skip: 0,
      where: newFilters,
      ...sorting
    })
  }, 500)
  
  useEffect(() => {
    if (!data || !data.erc721Listings)
      return;

    if (data.erc721Listings.length) {
      setListings(prev => [...prev, ...data.erc721Listings]);
      if (data.erc721Listings.length < PAGE_SIZE)
        setEndReached(true);
    }
    else
      setEndReached(true);
  }, [data]);

  const fetchData = () => {
    if (!fetching)
      setVariables(prevState => ({ ...prevState, skip: prevState.skip + PAGE_SIZE + 1 }))
  }

  return (
    <Style>
      <h2>Listings</h2>
      <Filters onChange={onFiltersChanged}/>
      <List fetchData={fetchData} fetching={fetching} hasMore={!endReached}>
        {endReached && !listings.length && (
          <Message>We couldn't find any listing matching your criteria <Emote alias="sadkek" /></Message>
        )}
        {listings.map(listing => <Listing listing={listing} key={listing.id} />)}
        {endReached && !!listings.length && (
          <Message>That's all! <Emote alias="peepoWeirdLook" style={{ marginBottom: 10}} /></Message>
        )}
      </List>
    </Style>
  )
}

export default Listings;