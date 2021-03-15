import env from 'config/env';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: env.AAVEGOTCHI_SUBGRAPH_URL,
});

const SubgraphProvider = ({ children }) => (
  <Provider value={client}>
    {children}
  </Provider>
);

export default SubgraphProvider;