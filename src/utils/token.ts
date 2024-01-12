import { EventHandlerContext } from '../types'
import {
  AssetsAccountStorage,
  AssetsAssetStorage,
  BalancesTotalIssuanceStorage,
  SystemAccountStorage,
  ZenlinkProtocolLiquidityPairsStorage,
  ZenlinkProtocolPairStatusesStorage,
} from '../types/storage'
import { AssetId } from '../types/v4300'
import { codec } from '@subsquid/ss58'
import { config } from '../config'
import { invert } from 'lodash'
import { sortAssets } from './sort'

export const currencyKeyMap: { [index: number]: string } = {
  0: 'Native',
  1: 'VToken',
  2: 'Token',
  3: 'Stable',
  4: 'VSToken',
  5: 'VSBond',
  6: 'LPToken',
  7: 'ForeignAsset',
  8: 'Token2',
  9: 'VToken2',
  10: 'VSToken2',
  11: 'VSBond2',
  12: 'StableLpToken',
}

export enum CurrencyTypeEnum {
  Native = 0,
  VToken = 1,
  Token = 2,
  Stable = 3,
  VSToken = 4,
  VSBond = 5,
  LPToken = 6,
  ForeignAsset = 7,
  Token2 = 8,
  VToken2 = 9,
  VSToken2 = 10,
  VSBond2 = 11,
  StableLpToken = 12,
}

export enum CurrencyIndexEnum {
  ASG = 0,
  BNC = 1,
  KUSD = 2,
  DOT = 3,
  KSM = 4,
  ETH = 5,
  KAR = 6,
  ZLK = 7,
  PHA = 8,
  RMRK = 9,
  MOVR = 10,
}

export const TokenIndexMap: { [index: number]: string } = {
  7: 'ForeignAsset',
  8: 'Token2',
  9: 'VToken2',
  10: 'VSToken2',
  12: 'StableLpToken',
}

export const currencyTokenSymbolMap: { [index: number]: string } = {
  0: 'ASG',
  1: 'BNC',
  2: 'KUSD',
  3: 'DOT',
  4: 'KSM',
  5: 'ETH',
  6: 'KAR',
  7: 'ZLK',
  8: 'PHA',
  9: 'RMRK',
  10: 'MOVR',
}

export const invertedTokenSymbolMap = invert(currencyTokenSymbolMap)

export function addressFromAsset({ chainId, assetIndex, assetType }: AssetId) {
  const newAssetIndex = [BigInt(0), BigInt(1)].includes(assetIndex) ? BigInt(0) : assetIndex
  return `${chainId}-${assetType}-${newAssetIndex.toString()}`
}

export function assetIdFromAddress(address: string): AssetId {
  const [chainId, assetType, assetIndex] = address.split('-')
  return {
    chainId: Number(chainId),
    assetType: Number(assetType),
    assetIndex: BigInt(assetIndex),
  }
}

export function parseTokenType(assetIndex: number): string {
  const assetU8 = (assetIndex & 0x0000_0000_0000_ff00) >> 8

  return currencyKeyMap[assetU8]
}

export function assetIdAdaptZenlink(CHAIN_ID: number, assetId: bigint) {
  let formattedAssetId: AssetId = {
    chainId: CHAIN_ID,
    assetType: [BigInt(0), BigInt(1)].includes(assetId) ? 0 : 2,
    assetIndex: [BigInt(0), BigInt(1)].includes(assetId) ? BigInt(0) : assetId,
  }
  return formattedAssetId
}

// export function zenlinkAssetIdToCurrencyId(asset: AssetId): any {
//   const assetIndex = Number(asset.assetIndex.toString())
//   const assetU8 = (assetIndex & 0x0000_0000_0000_ff00) >> 8
//   const tokenType = parseTokenType(assetIndex)
//   const assetSymbolIndex = assetIndex & 0x0000_0000_0000_000ff

//   if (TokenIndexMap[assetU8]) {
//     return {
//       __kind: tokenType,
//       value: assetSymbolIndex,
//     }
//   }

//   const tokenSymbol = currencyTokenSymbolMap[assetSymbolIndex]

//   return {
//     __kind: tokenType,
//     value: {
//       __kind: tokenSymbol === 'ASG' ? 'BNC' : tokenSymbol,
//     },
//   }
// }

// export function currencyIdToAssetIndex(currency: AssetId): number  {
//   const tokenType = CurrencyTypeEnum[currency.__kind]
//   let tokenIndex;

//   if(TokenIndexMap[tokenType]) {
//     tokenIndex = currency.value as number
//   } else {
//     tokenIndex = CurrencyIndexEnum[((currency.value) as TokenSymbol).__kind]
//   }

//   const assetIdIndex = parseToTokenIndex(tokenType, tokenIndex);
//   return assetIdIndex
// }

export function u8a2s(u8a: Uint8Array) {
  let dataString = ''
  for (let i = 0; i < u8a.length; i++) {
    dataString += String.fromCharCode(u8a[i])
  }

  return dataString
}

export function s2u8a(str: string) {
  const arr = []
  for (let i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i))
  }

  return new Uint8Array(arr)
}

export function parseToTokenIndex(type: number, index: number): number {
  if (type === 0) return 0

  return (type << 8) + index
}

const pairAssetIds = new Map<string, AssetId>()

export async function getPairAssetIdFromAssets(ctx: EventHandlerContext, _assets: [AssetId, AssetId]) {
  const assets = sortAssets(_assets)
  const [asset0, asset1] = assets
  const token0Address = addressFromAsset(asset0)
  const token1Address = addressFromAsset(asset1)
  const assetsId = `${token0Address}-${token1Address}`
  let pairAssetId: AssetId | undefined
  if (pairAssetIds.has(assetsId)) {
    pairAssetId = pairAssetIds.get(assetsId)
  } else {
    const pairsStorage = new ZenlinkProtocolLiquidityPairsStorage(ctx, ctx.block)
    if (!pairsStorage.isExists) return undefined
    pairAssetId = await pairsStorage.asV4300.get(assets)
    if (pairAssetId) {
      pairAssetIds.set(assetsId, pairAssetId)
    }
  }
  return pairAssetId
}

const pairAccounts = new Map<string, string>()

export async function getPairStatusFromAssets(
  ctx: EventHandlerContext,
  assets: [AssetId, AssetId],
  onlyAccount = true,
): Promise<[string | undefined, BigInt]> {
  const [asset0, asset1] = assets
  const token0Address = addressFromAsset(asset0)
  const token1Address = addressFromAsset(asset1)
  const assetsId = `${token0Address}-${token1Address}`
  let pairAccount: string | undefined
  if (pairAccounts.has(assetsId) && onlyAccount) {
    pairAccount = pairAccounts.get(assetsId)
    return [pairAccount!, BigInt(0)]
  } else {
    const statusStorage = new ZenlinkProtocolPairStatusesStorage(ctx, ctx.block)
    if (!statusStorage.isExists) return [undefined, BigInt(0)]
    const result = await statusStorage.asV4300.get(assets)
    if (result.__kind === 'Trading') {
      pairAccount = codec(config.prefix).encode(result.value.pairAccount)
      pairAccounts.set(assetsId, pairAccount)
      return [pairAccount, result.value.totalSupply]
    }

    return [undefined, BigInt(0)]
  }
}

export async function getTokenBalance(ctx: EventHandlerContext, assetId: bigint, account: Uint8Array) {
  let result
  if ([BigInt(0), BigInt(1)].includes(assetId)) {
    const systemAccountStorate = new SystemAccountStorage(ctx, ctx.block)
    if (systemAccountStorate.isV4020) {
      result = (await systemAccountStorate.asV4020.get(account)).data
    } else if (systemAccountStorate.isV4600) {
      result = (await systemAccountStorate.asV4600.get(account)).data
    }
    return result?.free
  } else {
    const assetsAccountStorage = new AssetsAccountStorage(ctx, ctx.block)
    if (assetsAccountStorage.isV4060) {
      result = await assetsAccountStorage.asV4060.get(assetId, account)
    } else if (assetsAccountStorage.isV4600) {
      result = await assetsAccountStorage.asV4600.get(assetId, account)
    }
    return result?.balance
  }
}

export async function getTotalIssuance(ctx: EventHandlerContext, assetId: AssetId) {
  let result
  if (assetId.assetType === 0) {
    const balanceIssuanceStorage = new BalancesTotalIssuanceStorage(ctx, ctx.block)
    result = await balanceIssuanceStorage.asV4020.get()
  } else {
    const assetsAssetStorage = new AssetsAssetStorage(ctx, ctx.block)
    if (assetsAssetStorage.isV4060) {
      result = await assetsAssetStorage.asV4060.get(assetId.assetIndex)
    } else if (assetsAssetStorage.isV4081) {
      result = await assetsAssetStorage.asV4081.get(assetId.assetIndex)
    }
    return result?.supply
  }
}

// export async function getTokenBurned(ctx: EventHandlerContext, assetId: AssetId, account: Uint8Array) {
//   let block = {
//     hash: ctx.block.parentHash,
//   }
//   let result: AccountData | AssetAccount | undefined
//   if (assetId.assetType === 0) {
//     const systemAccountStorate = new SystemAccountStorage(ctx, block)
//     result = (await systemAccountStorate.asV4401.get(account)).data
//     return result?.free
//   } else {
//     const assetsAccountStorage = new AssetsAccountStorage(ctx, block)
//     result = await assetsAccountStorage.asV4401.get(assetId.assetIndex, account)
//     return result?.balance
//   }
// }
