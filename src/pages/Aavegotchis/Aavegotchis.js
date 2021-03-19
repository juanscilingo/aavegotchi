import { aavegotchis } from "api/aavegotchi-subgraph/queries/aavegotchis";
import Aavegotchi from "components/Aavegotchi/Aavegotchi";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll";
import useQuery from "hooks/useQuery";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Style = styled.div`

`

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const PAGE_SIZE = 12;

const Aavegotchis = props => {
  const [gotchis, setGotchis] = useState([]);
  const [variables, setVariables] = useState({ 
    first: PAGE_SIZE, 
    skip: 0,
    where: { status: "3" }
  });
  const [endReached, setEndReached] = useState(false);
  const { data, fetching } = useQuery(aavegotchis, variables);
  
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
      setVariables(p => ({ ...p, skip: p.skip + PAGE_SIZE + 1 }))
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