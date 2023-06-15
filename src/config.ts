import { CHAIN_NODE } from "./constants";
import { ProcessorConfig } from "./types";

export const config: ProcessorConfig = {
  chainName: 'calamari',
  prefix: 'calamari',
  dataSource: {
    archive: 'http://localhost:8888/graphql',
    chain: CHAIN_NODE,
  },
}