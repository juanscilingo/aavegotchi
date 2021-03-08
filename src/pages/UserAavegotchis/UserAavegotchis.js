import Aavegotchi from "components/Aavegotchi/Aavegotchi";
import Loader from "components/UI/Loader/Loader";
import useUserContext from "hooks/useUserContext";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { diamondContract } from "utils/contracts";

const Style = styled.div`

`

const UserAavegotchis = props => {
  const { user } = useUserContext();
  const [gotchis, setGotchis] = useState();

  useEffect(() => {
    const fetchGotchis = async () => {
      let gotchis = await diamondContract.methods.allAavegotchisOfOwner(user.account).call();
      setGotchis(gotchis);
    }

    fetchGotchis();
  }, [user.account])

  if (!gotchis)
    return <Loader />;

  return (
    <Style>
      <h2>My Aavegotchis</h2>
      {gotchis.map(gotchi => (
        <Aavegotchi key={gotchi.tokenId} aavegotchi={gotchi} />
      ))}
    </Style>
  )
}

export default UserAavegotchis;