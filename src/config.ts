import { CHAIN_NODE } from "./constants";
import { ProcessorConfig } from "./types";

export const config: ProcessorConfig = {
  chainName: 'calamari',
  prefix: 'calamari',
  dataSource: {
    archive: 'https://calamari.archive.subsquid.io/graphql',
    chain: CHAIN_NODE,
  },
}
