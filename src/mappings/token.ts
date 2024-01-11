import { codec } from '@subsquid/ss58'
import { getPair } from '../entities/pair'
import { getPosition, getTransaction } from '../entities/utils'
import { CHAIN_ID, ZERO_BD } from '../constants'
import { EventHandlerContext, TOEKN_EVENT_TYPE } from '../types'
import { config } from '../config'
import { Big as BigDecimal } from 'big.js'
import { createLiquidityPosition } from '../utils/helpers'
import {
  Bundle,
  Burn,
  LiquidityPosition,
  LiquidityPositionSnapshot,
  Mint,
  Pair,
  Token,
  Transaction,
  User,
} from '../model'
import { AssetsBurnedEvent, AssetsIssuedEvent, AssetsTransferredEvent } from '../types/events'
import { assetIdAdaptZenlink, getPairStatusFromAssets, getTokenBalance } from '../utils/token'
import { AssetManagerLpToAssetIdPairStorage } from '../types/storage'

async function isCompleteMint(ctx: EventHandlerContext, mintId: string): Promise<boolean> {
  return !!(await ctx.store.get(Mint, mintId))?.sender // sufficient checks
}

export async function handleTokenDeposited(ctx: EventHandlerContext) {
  const transactionHash = ctx.event.extrinsic?.hash
  if (!transactionHash) return

  const issuedEvent = new AssetsIssuedEvent(ctx, ctx.event)

  let event
  if (issuedEvent.isV4600) {
    event = issuedEvent.asV4600
  } else {
    event = issuedEvent.asV4401
  }

  const lpToAssetIdPairStorage = new AssetManagerLpToAssetIdPairStorage(ctx)

  const lpToken = await lpToAssetIdPairStorage.asV4401.get(event.assetId)

  if (!event || !lpToken) return

  const [token0Index, token1Index] = lpToken

  const asset0 = assetIdAdaptZenlink(CHAIN_ID, token0Index)
  const asset1 = assetIdAdaptZenlink(CHAIN_ID, token1Index)

  const pair = await getPair(ctx, [asset0, asset1])
  if (!pair) return

  let value
  if (issuedEvent.isV4600) {
    value = issuedEvent.asV4600.amount.toString()
  } else {
    value = issuedEvent.asV4401.totalSupply.toString()
  }
  const to = codec(config.prefix).encode(event.owner)
  let user = await ctx.store.get(User, to)
  if (!user) {
    user = new User({
      id: to,
      liquidityPositions: [],
      stableSwapLiquidityPositions: [],
      usdSwapped: ZERO_BD.toFixed(6),
    })
    await ctx.store.save(user)
  }

  // get or create transaction
  let transaction = await getTransaction(ctx, transactionHash)
  if (!transaction) {
    transaction = new Transaction({
      id: transactionHash,
      blockNumber: BigInt(ctx.block.height),
      timestamp: new Date(ctx.block.timestamp),
      mints: [],
      burns: [],
      swaps: [],
    })
    await ctx.store.save(transaction)
  }

  const { mints } = transaction

  pair.totalSupply = (await getPairStatusFromAssets(ctx, [asset0, asset1], false))[1].toString()
  if (!mints.length || (await isCompleteMint(ctx, mints[mints.length - 1]))) {
    const mint = new Mint({
      id: `${transactionHash}-${mints.length}`,
      transaction,
      pair,
      to,
      liquidity: value,
      timestamp: new Date(ctx.block.timestamp),
    })
    await ctx.store.save(mint)
    transaction.mints = mints.concat([mint.id])
    await ctx.store.save(transaction)
  }
  await ctx.store.save(pair)

  const position = await updateLiquidityPosition(ctx, pair, user)
  position.liquidityTokenBalance = (await getTokenBalance(ctx, event.assetId, event.owner))?.toString() ?? '0'
  await ctx.store.save(position)
  await createLiquiditySnapShot(ctx, pair, position)
}

export async function handleTokenWithdrawn(ctx: EventHandlerContext) {
  const transactionHash = ctx.event.extrinsic?.hash
  if (!transactionHash) return

  const burnedEvent = new AssetsBurnedEvent(ctx, ctx.event)
  const event = burnedEvent.asV4401

  const lpToAssetIdPairStorage = new AssetManagerLpToAssetIdPairStorage(ctx)

  const lpToken = await lpToAssetIdPairStorage.asV4401.get(event.assetId)

  if (!event || !lpToken) return

  const [token0Index, token1Index] = lpToken
  const asset0 = assetIdAdaptZenlink(CHAIN_ID, token0Index)
  const asset1 = assetIdAdaptZenlink(CHAIN_ID, token1Index)

  const pair = await getPair(ctx, [asset0, asset1])
  if (!pair) return

  const value = event.balance.toString()
  const to = codec(config.prefix).encode(event.owner)
  let user = await ctx.store.get(User, to)
  if (!user) {
    user = new User({
      id: to,
      liquidityPositions: [],
      stableSwapLiquidityPositions: [],
      usdSwapped: ZERO_BD.toFixed(6),
    })
    await ctx.store.save(user)
  }

  // get or create transaction
  let transaction = await getTransaction(ctx, transactionHash)
  if (!transaction) {
    transaction = new Transaction({
      id: transactionHash,
      blockNumber: BigInt(ctx.block.height),
      timestamp: new Date(ctx.block.timestamp),
      mints: [],
      burns: [],
      swaps: [],
    })
    await ctx.store.save(transaction)
  }

  pair.totalSupply = (await getPairStatusFromAssets(ctx, [asset0, asset1], false))[1].toString()
  const { burns, mints } = transaction
  let burn: Burn
  if (burns.length > 0) {
    const currentBurn = await ctx.store.get(Burn, burns[burns.length - 1])
    if (currentBurn?.needsComplete) {
      burn = currentBurn
    } else {
      burn = new Burn({
        id: `${transactionHash}-${burns.length}`,
        transaction,
        needsComplete: false,
        pair,
        liquidity: value,
        timestamp: new Date(ctx.block.timestamp),
      })
    }
  } else {
    burn = new Burn({
      id: `${transactionHash}-${burns.length}`,
      transaction,
      needsComplete: false,
      pair,
      liquidity: value,
      timestamp: new Date(ctx.block.timestamp),
    })
  }

  // if this logical burn included a fee mint, account for this
  if (mints.length !== 0 && !(await isCompleteMint(ctx, mints[mints.length - 1]))) {
    const mint = await ctx.store.get(Mint, mints[mints.length - 1])
    if (mint) {
      burn.feeTo = mint.to
      burn.feeLiquidity = mint.liquidity
    }

    await ctx.store.remove(Mint, mints[mints.length - 1])
    mints.pop()
    transaction.mints = mints
  }
  await ctx.store.save(burn)
  if (burn.needsComplete) {
    // TODO: Consider using .slice(0, -1).concat() to protect against
    // unintended side effects for other code paths.
    burns[burns.length - 1] = burn.id
  } else {
    burns.push(burn.id)
  }
  transaction.burns = burns

  await ctx.store.save(transaction)
  await ctx.store.save(pair)

  const position = await updateLiquidityPosition(ctx, pair, user)
  position.liquidityTokenBalance = (await getTokenBalance(ctx, event.assetId, event.owner))?.toString() ?? '0'
  await ctx.store.save(position)
  await createLiquiditySnapShot(ctx, pair, position)
}

export async function handleTokenTransfer(ctx: EventHandlerContext) {
  const issuedEvent = new AssetsTransferredEvent(ctx, ctx.event)
  const event = issuedEvent.asV4401

  const lpToAssetIdPairStorage = new AssetManagerLpToAssetIdPairStorage(ctx)

  const lpToken = await lpToAssetIdPairStorage.asV4401.get(event.assetId)

  if (!event || !lpToken) return

  const [token0Index, token1Index] = lpToken
  const asset0 = assetIdAdaptZenlink(CHAIN_ID, token0Index)
  const asset1 = assetIdAdaptZenlink(CHAIN_ID, token1Index)

  const pair = await getPair(ctx, [asset0, asset1])
  if (!pair) return

  const from = codec(config.prefix).encode(event.from)
  const to = codec(config.prefix).encode(event.to)

  let userFrom = await ctx.store.get(User, from)
  if (!userFrom) {
    userFrom = new User({
      id: from,
      liquidityPositions: [],
      stableSwapLiquidityPositions: [],
      usdSwapped: ZERO_BD.toString(),
    })
    await ctx.store.save(userFrom)
  }
  const positionFrom = await updateLiquidityPosition(ctx, pair, userFrom)
  positionFrom.liquidityTokenBalance = (await getTokenBalance(ctx, event.assetId, event.from))?.toString() ?? '0'
  await ctx.store.save(positionFrom)
  await createLiquiditySnapShot(ctx, pair, positionFrom)

  let userTo = await ctx.store.get(User, to)
  if (!userTo) {
    userTo = new User({
      id: to,
      liquidityPositions: [],
      stableSwapLiquidityPositions: [],
      usdSwapped: ZERO_BD.toFixed(6),
    })
    await ctx.store.save(userTo)
  }
  const positionTo = await updateLiquidityPosition(ctx, pair, userTo)
  positionTo.liquidityTokenBalance = (await getTokenBalance(ctx, event.assetId, event.to))?.toString() ?? '0'
  await ctx.store.save(positionTo)
  await createLiquiditySnapShot(ctx, pair, positionTo)
}

export async function updateLiquidityPosition(
  ctx: EventHandlerContext,
  pair: Pair,
  user: User,
): Promise<LiquidityPosition> {
  let position = await getPosition(ctx, `${pair.id}-${user.id}`)
  if (!position) {
    position = createLiquidityPosition({
      pair,
      user,
    })

    await ctx.store.save(position)

    pair.liquidityProviderCount += 1
  }
  return position
}

export async function createLiquiditySnapShot(
  ctx: EventHandlerContext,
  pair: Pair,
  position: LiquidityPosition,
): Promise<void> {
  const bundle = await ctx.store.get(Bundle, '1')
  const { timestamp } = ctx.block
  if (!pair || !bundle) return
  const token0 = await ctx.store.get(Token, pair.token0.id)
  const token1 = await ctx.store.get(Token, pair.token1.id)
  if (!token0 || !token1) return

  let snapshot = await ctx.store.get(LiquidityPositionSnapshot, `${position.id}${timestamp}`)

  if (!snapshot) {
    // create new snapshot
    snapshot = new LiquidityPositionSnapshot({
      id: `${position.id}${timestamp}`,
      liquidityPosition: position,
      timestamp: new Date(timestamp),
      block: ctx.block.height,
      user: position.user,
      pair: position.pair,
      token0PriceUSD: BigDecimal(token0.derivedETH).times(BigDecimal(bundle.ethPrice)).toFixed(6),
      token1PriceUSD: BigDecimal(token1.derivedETH).times(BigDecimal(bundle.ethPrice)).toFixed(6),
      reserve0: pair.reserve0,
      reserve1: pair.reserve1,
      reserveUSD: pair.reserveUSD,
      liquidityTokenTotalSupply: pair.totalSupply,
      liquidityTokenBalance: position.liquidityTokenBalance,
    })
    await ctx.store.save(snapshot)
  }
}
