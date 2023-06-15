import { TokenBase } from './types'
import { Big as BigDecimal } from 'big.js'

export const CHAIN_NODE = 'wss://zenlink.zqhxuyuan.cloud:444'

export const TOKEN_METADATA_MAP: { [address: string]: TokenBase } = {
  '2084-0-0': { name: 'Calamari', symbol: 'KMA', decimals: 12 },
  '2084-2-8': { name: 'Karura Native Token', symbol: 'KAR', decimals: 12 },
  // '2084-2-516': { name: 'Kusama', symbol: 'KSM', decimals: 12 },
  // '2084-2-519': { name: 'Zenlink Network Token', symbol: 'ZLK', decimals: 18 },
  // '2084-2-518': { name: 'Karura', symbol: 'KAR', decimals: 12 },
  // '2084-2-1028': { name: 'vsKSM', symbol: 'vsKSM', decimals: 12 },
  // '2084-2-521': { name: 'RMRK', symbol: 'RMRK', decimals: 10 },
  // '2084-2-260': { name: 'vKusama', symbol: 'vKSM', decimals: 12 },
  // '2084-2-2048': { name: 'USDT', symbol: 'USDT', decimals: 6 },
}

export const CHAIN_ID = 2084

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
