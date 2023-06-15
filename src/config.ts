import { CHAIN_NODE } from "./constants";
import { ProcessorConfig } from "./types";

export const config: ProcessorConfig = {
  chainName: 'calamari',
  prefix: 'calamari',
  dataSource: {
    archive: 'http://localhost:4444/graphql',
    chain: CHAIN_NODE,
  },
}


// calamari data <-
// local    data <-