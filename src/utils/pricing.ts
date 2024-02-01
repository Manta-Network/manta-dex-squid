import { Big as BigDecimal } from 'big.js'
import { ONE_BD, ZERO_BD } from '../constants'
import { getPair } from '../entities/pair'
import { getOrCreateToken } from '../entities/token'
import { Pair } from '../model'
import { EventHandlerContext } from '../types'
import { assetIdFromAddress } from './token'
import { queryBundleBySubScan } from './nativeToken'

export const WNATIVE = '2104-0-0' // MANTA
export const DOT = '2104-2-8'  // DOT
export const USDT = '2104-2-9' // USDT
export const GLMR = '2104-2-10' // Moonbeam
// export const ACA = '2104-2-11' // Acala
// export const LDOT = '2104-2-12' // LDOT
export const MANDEX = '2104-2-31' // MANDEX
// export const WNATIVE_USDC = '2104-2-8796093023744'



export const WHITELIST: string[] = [
  WNATIVE, // wnative
  DOT, // DOT
  USDT,
  GLMR,
  // ACA,
  // LDOT,
  MANDEX
]

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = new BigDecimal(1000)

// minimum liquidity for price to get tracked
export const MINIMUM_LIQUIDITY_THRESHOLD_ETH = new BigDecimal(5)

export async function getEthPriceInUSD(ctx: EventHandlerContext): Promise<BigDecimal> {
  // const price =  await queryBundleBySubScan(ctx.block.timestamp);
  // return BigDecimal(price)
  // const usdtPair = await getPair(ctx, [assetIdFromAddress(WNATIVE), assetIdFromAddress(USDT)])
  // if (usdtPair) {
  //   return usdtPair.token0.id === USDT
  //     ? BigDecimal(usdtPair.token0Price)
  //     : BigDecimal(usdtPair.token1Price)
  // }

  // get ethprice from bnc-ksm > ksm-USDT pair
  // const glmrPair = await getPair(ctx, [assetIdFromAddress(GLMR), assetIdFromAddress(USDT)])
  // const wnativePair = await getPair(ctx, [assetIdFromAddress(WNATIVE), assetIdFromAddress(GLMR)])
  // if (glmrPair && wnativePair) {
  //   const glmrPrice = glmrPair.token0.id === USDT
  //     ? BigDecimal(glmrPair.token0Price)
  //     : BigDecimal(glmrPair.token1Price)
  //   return wnativePair.token0.id === GLMR
  //     ? BigDecimal(wnativePair.token0Price).mul(glmrPrice)
  //     : BigDecimal(wnativePair.token1Price).mul(glmrPrice)
  // }

  const price =  await queryBundleBySubScan(ctx.block.timestamp);
  if(price) {
    return BigDecimal(price)
  }
  return BigDecimal(0)
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
