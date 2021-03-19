import { aavegotchis } from "api/aavegotchi-subgraph/queries/aavegotchis";
import Aavegotchi from "components/Aavegotchi/Aavegotchi";
import Loader from "components/UI/Loader/Loader";
import useQuery from "hooks/useQuery";
import useUserContext from "hooks/useUserContext";
import { useMemo } from "react";
import styled from "styled-components";

const Style = styled.div`

`

const UserAavegotchis = props => {
  const { user } = useUserContext();
  
  const variables = useMemo(() => ({
    where: { owner: user.account }
  }), [user.account]);

  const { data, fetching } = useQuery(aavegotchis, variables)

  if (fetching)
    return <Loader />;

  return (
    <Style>
      <h2>My Aavegotchis</h2>
      {data.aavegotchis.map(gotchi => (
        <Aavegotchi key={gotchi.id} aavegotchi={gotchi} />
      ))}
    </Style>
  )
}

export default UserAavegotchis;