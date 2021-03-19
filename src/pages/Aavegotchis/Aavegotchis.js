import { aavegotchis } from "api/aavegotchi-subgraph/queries/aavegotchis";
import Aavegotchi from "components/Aavegotchi/Aavegotchi";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "urql";

const Style = styled.div`

`

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const PAGE_SIZE = 12;

const Aavegotchis = props => {
  const [gotchis, setGotchis] = useState([]);
  const [pagination, setPagination] = useState({ first: PAGE_SIZE, skip: 0 })
  const [endReached, setEndReached] = useState(false);
  const [{ data, fetching }] = useQuery({
    query: aavegotchis,
    variables: {
      first: pagination.first,
      skip: pagination.skip,
      where: { status: "3" }
    }
  })
  
  useEffect(() => {
    if (!data || !data.aavegotchis)
      return;

    if (data.aavegotchis.length) {
      setGotchis(prev => [...prev, ...data.aavegotchis]);
      if (data.aavegotchis.length < PAGE_SIZE)
        setEndReached(true);
    }
    else
      setEndReached(true);
  }, [data]);


  const fetchData = () => {
    if (!fetching)
      setPagination(prevState => ({ ...pagination, skip: prevState.skip + PAGE_SIZE + 1 }))
  }

  return (
    <Style>
      <h2>Aavegotchis</h2>
      <InfiniteScroll fetchData={fetchData} fetching={fetching} hasMore={!endReached}>
        <List>
          {gotchis.map(gotchi => (
            <Aavegotchi key={gotchi.id} aavegotchi={gotchi} />
          ))}
        </List>
      </InfiniteScroll>
    </Style>
  )
}

export default Aavegotchis;