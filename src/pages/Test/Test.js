import { aavegotchis } from "api/aavegotchi-subgraph/queries/aavegotchis";
import useQuery from "hooks/useQuery";
import { useState } from "react";

const Test = () => {
  const [variables, setVariables] = useState({});
  const { data, fetching } = useQuery(aavegotchis, variables);

  return (
    <div>
      <h3>Test Page</h3>
      <div>
        {JSON.stringify(data)}
      </div>
    </div>
  )
}

export default Test;