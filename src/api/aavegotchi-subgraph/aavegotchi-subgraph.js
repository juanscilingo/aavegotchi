import env from 'config/env';
import { GraphQLClient } from 'graphql-request';

const subgraph = new GraphQLClient(env.AAVEGOTCHI_SUBGRAPH_URL);

export default subgraph;