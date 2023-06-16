import { CHAIN_NODE } from "./constants";
import { ProcessorConfig } from "./types";

export const config: ProcessorConfig = {
  chainName: 'calamari',
  prefix: 'calamari',
  dataSource: {
    archive: 'http://34.227.17.192:8888/graphql',
    chain: CHAIN_NODE,
  },
}