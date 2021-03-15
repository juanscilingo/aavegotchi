import { aavegotchis } from "api/aavegotchi-subgraph/queries/aavegotchis";
import Aavegotchi from "components/Aavegotchi/Aavegotchi";
import Loader from "components/UI/Loader/Loader";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import { useQuery } from "urql";

const Style = styled.div`

`

const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
`

const Aavegotchis = props => {
  const [gotchis, setGotchis] = useState([]);
  const [pagination, setPagination] = useState({ first: 12, skip: 0 })
  const [{ data, fetching, error }] = useQuery({
    query: aavegotchis,
    variables: {
      first: pagination.first,
      skip: pagination.skip,
      where: { status: "3" }
    }
  })
  
  useEffect(() => {
    if (data)
      setGotchis(prev => [...prev, ...data.aavegotchis])
  }, [data]);


  const loadMore = params => {
    if (!fetching)
      setPagination(prevState => ({ ...pagination, skip: prevState.skip + prevState.first }))
  }

  if (error)
    return null;

  return (
    <Style>
      <h2>Aavegotchis</h2>
      <StyledInfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore
        loader={<Loader key={0} />}
      >
        {gotchis.map(gotchi => (
          <Aavegotchi key={gotchi.id} aavegotchi={gotchi} />
        ))}
      </StyledInfiniteScroll>
    </Style>
  )
}

export default Aavegotchis;