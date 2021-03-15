import { aavegotchis } from "api/aavegotchi-subgraph/queries/aavegotchis";
import Aavegotchi from "components/Aavegotchi/Aavegotchi";
import Loader from "components/UI/Loader/Loader";
import useUserContext from "hooks/useUserContext";
import styled from "styled-components";
import { useQuery } from "urql";

const Style = styled.div`

`

const UserAavegotchis = props => {
  const { user } = useUserContext();
  const [{ data, fetching, error }] = useQuery({
    query: aavegotchis,
    variables: {
      where: { owner: user.account }
    }
  })

  if (error)
    return null;

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