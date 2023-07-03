import { Big as BigDecimal } from 'big.js'
import { ONE_BD, ZERO_BD } from '../constants'
import { getPair } from '../entities/pair'
import { getOrCreateToken } from '../entities/token'
import { Pair } from '../model'
import { EventHandlerContext } from '../types'
import { assetIdFromAddress } from './token'
import { queryBundleBySubScan } from './nativeToken'

export const WNATIVE = '2084-0-0' // KMA
export const KAR = '2084-2-8'  // KAR
export const MOVR = '2084-2-11'
export const KSM = '2084-2-12'
export const USDT = '2084-2-14'
// export const WNATIVE_USDC = '2084-2-8796093023744'



export const WHITELIST: string[] = [
  WNATIVE, // wnative
  KAR, // KAR
  KSM,
  USDT,
  MOVR
]

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = new BigDecimal(1000)

// minimum liquidity for price to get tracked
export const MINIMUM_LIQUIDITY_THRESHOLD_ETH = new BigDecimal(5)

export async function getEthPriceInUSD(ctx: EventHandlerContext): Promise<BigDecimal> {
  const price =  await queryBundleBySubScan(ctx.block.timestamp);
  return BigDecimal(price)
  // const usdcPair = await getPair(ctx, [assetIdFromAddress(WNATIVE), assetIdFromAddress(USDC)])
  // if (usdcPair) {
  //   return usdcPair.token0.id === USDC
  //     ? BigDecimal(usdcPair.token0Price)
  //     : BigDecimal(usdcPair.token1Price)
  // }

  // // get ethprice from bnc-ksm > ksm-USDT pair
  // const ksmPair = await getPair(ctx, [assetIdFromAddress(KSM), assetIdFromAddress(USDT)])
  // const wnativePair = await getPair(ctx, [assetIdFromAddress(WNATIVE), assetIdFromAddress(KSM)])
  // if (ksmPair && wnativePair) {
  //   const ksmPrice = ksmPair.token0.id === USDT
  //     ? BigDecimal(ksmPair.token0Price)
  //     : BigDecimal(ksmPair.token1Price)
  //   return wnativePair.token0.id === KSM
  //     ? BigDecimal(wnativePair.token0Price).mul(ksmPrice)
  //     : BigDecimal(wnativePair.token1Price).mul(ksmPrice)
  // }
  // return BigDecimal(0)
}


/**
 * Search through graph to find derived Eth per token.
 * @todo update to be derived ETH (plus stablecoin estimates)
 * */
export async function findEthPerToken(
  ctx: EventHandlerContext,
  tokenId: string
): Promise<BigDecimal> {
  if (tokenId === WNATIVE) {
    return ONE_BD
  }

  const whitelistPairs = await ctx.store.find(Pair, {
    where: WHITELIST.map((address) => [
      { token0: { id: address }, token1: { id: tokenId } },
      { token1: { id: address }, token0: { id: tokenId } },
    ]).flat(),
    relations: {
      token0: true,
      token1: true,
    },
  })

  // loop through whitelist and check if paired with any
  for (const pair of whitelistPairs) {
    if (BigDecimal(pair.reserveETH).gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
      if (pair.token0.id === tokenId) {
        const token1 = (await getOrCreateToken(ctx, assetIdFromAddress(pair.token1.id)))!
        return BigDecimal(pair.token1Price).mul(token1.derivedETH) // return token1 per our token * Eth per token 1
      }
      if (pair.token1.id === tokenId) {
        const token0 = (await getOrCreateToken(ctx, assetIdFromAddress(pair.token0.id)))!
        return BigDecimal(pair.token0Price).mul(token0.derivedETH) // return token0 per our token * ETH per token 0
      }
    }
  }
  return ZERO_BD // nothing was found return 0
}
