import subgraph from "api/aavegotchi-subgraph/aavegotchi-subgraph";
import { useEffect, useState } from "react";

const useQuery = (query, variables) => {
  const [state, setState] = useState({
    fetching: true,
    data: undefined
  });

  useEffect(() => {
    setState(s => ({ ...s, fetching: true }));

    const fetchData = async () => {
      const response = await subgraph.request(query, variables);
      setState({ fetching: false, data: response });
    }

    fetchData();
  }, [query, variables]);

  return state;
}

export default useQuery;