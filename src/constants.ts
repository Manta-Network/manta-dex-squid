import { TokenBase } from './types'
import { Big as BigDecimal } from 'big.js'

export const CHAIN_NODE = 'wss://c1.baikal.testnet.manta.systems'

export const TOKEN_METADATA_MAP: { [address: string]: TokenBase } = {
  '2104-0-0': { name: 'Manta', symbol: 'MANTA', decimals: 18 },
  '2104-2-8': { name: 'Polkadot', symbol: 'DOT', decimals: 10 },
  '2104-2-9': { name: 'Tether USD', symbol: 'USDT', decimals: 6 },
  '2104-2-10': { name: 'Moonbeam', symbol: 'GLMR', decimals: 18 },
  '2104-2-11': { name: 'Acala', symbol: 'ACA', decimals: 12 },
  '2104-2-12': { name: 'Liquid DOT', symbol: 'LDOT', decimals: 12 },
  '2104-2-31': { name: 'MANDEX', symbol: 'MANDEX', decimals: 12 },
  // '2104-2-1028': { name: 'vsKSM', symbol: 'vsKSM', decimals: 12 },
  // '2104-2-521': { name: 'RMRK', symbol: 'RMRK', decimals: 10 },
  // '2104-2-260': { name: 'vKusama', symbol: 'vKSM', decimals: 12 },
  // '2104-2-2048': { name: 'USDT', symbol: 'USDT', decimals: 6 },
}

export const CHAIN_ID = 2104

// export const ZLK_ASSET_ID: AssetId = {
//   chainId: CHAIN_ID,
//   assetType: 2,
//   assetIndex: 519n,
// }

// export const ZLK_CURRENCY_ID = ZLK_ASSET_ID

// export const ZLK_GOV_ACCOUNT = ['cRzg4nyCBKbCZaCYmNQksWGMJuectrHom15ZiuYd7h6NtvW']

// export const ZERO_BI = 0n
// export const ONE_BI = 1n
export const ZERO_BD = BigDecimal(0)
export const ONE_BD = BigDecimal(1)
// export const BI_18 = 1000000000000000000n
