import { CHAIN_ID } from '../constants'
import { getPair } from '../entities/pair'
import { getOrCreateToken } from '../entities/token'
import { updateSingleTokenLockDayData, updateSingleTokenLockHourData } from '../mappings/farming/update'
import { handleLiquiditySync } from '../mappings/protocol'
// import { handleLiquiditySync } from "../mappings/protocol";
import { Bundle, Farm, Incentive, Pair, SingleTokenLock } from '../model'
import { EventHandlerContext } from '../types'
import {
  FarmingAllForceGaugeClaimedEvent,
  FarmingAllRetiredEvent,
  FarmingChargedEvent,
  FarmingClaimedEvent,
  FarmingDepositedEvent,
  FarmingFarmingPoolClosedEvent,
  FarmingFarmingPoolCreatedEvent,
  FarmingFarmingPoolEditedEvent,
  FarmingFarmingPoolKilledEvent,
  FarmingFarmingPoolResetEvent,
  FarmingGaugeWithdrawnEvent,
  FarmingPartiallyForceGaugeClaimedEvent,
  FarmingPartiallyRetiredEvent,
  FarmingRetireLimitSetEvent,
  FarmingWithdrawClaimedEvent,
  FarmingWithdrawnEvent,
} from '../types/events'
import {
  AssetManagerLpToAssetIdPairStorage,
  FarmingPoolInfosStorage,
  FarmingSharesAndWithdrawnRewardsStorage,
} from '../types/storage'
import { convertTokenToDecimal, getTimePerBlock } from './helpers'
import { sortAssets } from './sort'
import { assetIdAdaptZenlink } from './token'

export function formatFarmingCreatedPoolEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingFarmingPoolCreatedEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}

export function formatFarmingPoolResetEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingFarmingPoolResetEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}

export function formatFarmingPoolClosedEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingFarmingPoolClosedEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}

export function formatFarmingPoolKilledEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingFarmingPoolKilledEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}

export function formatFarmingPoolEditedEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingFarmingPoolEditedEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}

export function formatFarmingChargedEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingChargedEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}

export function formatFarmingDepositedEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingDepositedEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}
export function formatFarmingWithdrawnEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingWithdrawnEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}
export function formatFarmingClaimedEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingClaimedEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}
export function formatFarmingWithdrawClaimedEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingWithdrawClaimedEvent(ctx)
  if (_event.asV4100) {
    event = _event.asV4100
  }
  return event
}
export function formatFarmingGaugeWithdrawnEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingGaugeWithdrawnEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}
export function formatFarmingAllForceGaugeClaimedEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingAllForceGaugeClaimedEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}
export function formatFarmingPartiallyForceGaugeClaimedEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingPartiallyForceGaugeClaimedEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}
export function formatFarmingAllRetiredEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingAllRetiredEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}
export function formatFarmingPartiallyRetiredEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingPartiallyRetiredEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}
export function formatFarmingRetireLimitSetEvent(ctx: EventHandlerContext) {
  let event
  const _event = new FarmingRetireLimitSetEvent(ctx)
  if (_event.isV4100) {
    event = _event.asV4100
  }
  return event
}

export async function getFamingPoolInfo(
  ctx: EventHandlerContext,
  pid: bigint,
  block = {
    hash: ctx.block.hash,
  },
) {
  let result

  const farmingPoolInfoStorage = new FarmingPoolInfosStorage(ctx, block)
  if (farmingPoolInfoStorage.isV4100) {
    result = await farmingPoolInfoStorage.asV4100.get(pid)
  }
  return result
}

export async function getFamingSharesAndWithdrawnRewards(ctx: EventHandlerContext, pid: number, user: Uint8Array) {
  let result

  const storage = new FarmingSharesAndWithdrawnRewardsStorage(ctx, ctx.block)
  if (storage.isV4100) {
    result = await storage.asV4100.get(BigInt(pid), user)
  }
  return result
}

export async function updateFarmingPoolInfo(ctx: EventHandlerContext, pid: bigint) {
  const farmingPoolInfo = await getFamingPoolInfo(ctx, pid)
  const farmingTokens = farmingPoolInfo?.tokensProportion.map((item) => item[0])!
  const farmingToken = farmingTokens[0]
  const assetIdIndex = farmingToken

  const poolState = farmingPoolInfo?.state

  let stakeToken = farmingToken.toString()
  const liquidityStaked = farmingPoolInfo?.totalShares ?? 0n

  const timePerBlock = await getTimePerBlock(ctx)

  const blocksPerDay = BigInt(((3600 * 1000 * 24) / timePerBlock).toFixed(0))

  let stakeUSD = '0'
  let rewardUSDRate = '0'

  let stakeApr = '0'

  const basicRewardPerDay = await Promise.all(
    farmingPoolInfo!.basicRewards.map(async (item) => {
      const assetIndex = item[0]
      const token = await getOrCreateToken(ctx, {
        chainId: CHAIN_ID,
        assetType: [BigInt(0), BigInt(1)].includes(assetIndex) ? 0 : 2,
        assetIndex: BigInt(assetIndex),
      })
      if (!token) return
      const rewardPerDay = item[1] * blocksPerDay

      const rewardTokenDecimal = convertTokenToDecimal(BigInt(rewardPerDay), token.decimals)
      return {
        token,
        rewardPerDay: rewardTokenDecimal,
      }
    }),
  )

  const basicRewardEthPerDay = await Promise.all(
    farmingPoolInfo!.basicRewards.map(async (item) => {
      const assetIndex = item[0]
      const token = await getOrCreateToken(ctx, {
        chainId: CHAIN_ID,
        assetType: [BigInt(0), BigInt(1)].includes(assetIndex) ? 0 : 2,
        assetIndex: BigInt(assetIndex),
      })
      if (!token) return '0'
      const rewardPerDay = item[1] * blocksPerDay

      const rewardTokenDecimal = convertTokenToDecimal(BigInt(rewardPerDay), token.decimals)
      const rewardEth = rewardTokenDecimal.times(token.derivedETH).toFixed(6)
      return rewardEth
    }),
  )

  const rewardEthPerDay = basicRewardEthPerDay.reduce((total, cur) => {
    return total + Number(cur)
  }, 0)

  let bundle = await ctx.store.get(Bundle, '1')
  let rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

  let farmingData: Farm | undefined

  const lpToAssetIdPairStorage = new AssetManagerLpToAssetIdPairStorage(ctx)

  const lpToken = await lpToAssetIdPairStorage.asV4100.get(farmingToken)

  if (lpToken) {
    const [token0Index, token1Index] = lpToken

    const _asset0 = assetIdAdaptZenlink(CHAIN_ID, token0Index)
    const _asset1 = assetIdAdaptZenlink(CHAIN_ID, token1Index)
    const [asset0, asset1] = sortAssets([_asset0, _asset1])
    let pair = await getPair(ctx, [asset0, asset1])
    if (pair) {
      await handleLiquiditySync(ctx, pair)
      pair = (await getPair(ctx, [asset0, asset1]))!

      bundle = await ctx.store.get(Bundle, '1')
      rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

      rewardUSDRate = rewardUSDPerDay.toFixed(6)
      stakeToken = pair.id
      const stakedUSD =
        BigInt(pair.totalSupply) === 0n
          ? 0
          : (Number(liquidityStaked) * Number(pair.reserveUSD ?? 0)) / Number(BigInt(pair.totalSupply ?? 0))
      stakeUSD = stakedUSD.toFixed(6)

      const farmingId = `${stakeToken}-${pid}`
      farmingData = await ctx.store.get(Farm, farmingId)
      if (!farmingData) {
        farmingData = new Farm({
          id: farmingId,
          pid: BigInt(pid),
          stakeToken: stakeToken,
          liquidityStaked: liquidityStaked,
          createdAtBlock: BigInt(ctx.block.height),
          createdAtTimestamp: BigInt(ctx.block.timestamp),
          stakedUSD: stakeUSD,
          rewardUSDPerDay: rewardUSDRate,
          stakeApr,
        })
      }
      if (!farmingData.pair) {
        farmingData.pair = pair
      }
    }
  } else {
    // single token
    bundle = await ctx.store.get(Bundle, '1')
    rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)
    rewardUSDRate = rewardUSDPerDay.toFixed(6)

    const token = await getOrCreateToken(ctx, {
      chainId: CHAIN_ID,
      assetType: [BigInt(0), BigInt(1)].includes(assetIdIndex) ? 0 : 2,
      assetIndex: BigInt(assetIdIndex),
    })

    if (!token) return

    let singleTokenLock = await ctx.store.get(SingleTokenLock, {
      where: {
        id: token.id,
      },
    })

    if (!singleTokenLock) {
      singleTokenLock = new SingleTokenLock({
        id: token.id,
        token: token,
        totalLiquidity: '0',
        totalLiquidityETH: '0',
        totalLiquidityUSD: '0',
      })
    }

    stakeToken = token.id
    const stakeTokenDecimal = convertTokenToDecimal(BigInt(liquidityStaked), token.decimals)

    const stakedUSD = stakeTokenDecimal.times(token.derivedETH).times(bundle?.ethPrice ?? 0)
    stakeUSD = stakedUSD.toFixed(6)

    singleTokenLock.totalLiquidity = liquidityStaked.toString()
    singleTokenLock.totalLiquidityETH = stakeTokenDecimal.times(token.derivedETH).toFixed(6)
    singleTokenLock.totalLiquidityUSD = stakeUSD
    await ctx.store.save(singleTokenLock)
    await updateSingleTokenLockHourData(ctx, singleTokenLock)
    await updateSingleTokenLockDayData(ctx, singleTokenLock)

    const farmingId = `${stakeToken}-${pid}`
    farmingData = await ctx.store.get(Farm, farmingId)
    if (!farmingData) {
      farmingData = new Farm({
        id: farmingId,
        pid: BigInt(pid),
        stakeToken: stakeToken,
        liquidityStaked: liquidityStaked,
        createdAtBlock: BigInt(ctx.block.height),
        createdAtTimestamp: BigInt(ctx.block.timestamp),
        stakedUSD: stakeUSD,
        rewardUSDPerDay: rewardUSDRate,
        stakeApr,
      })
    }
    if (!farmingData.singleTokenLock) {
      farmingData.singleTokenLock = singleTokenLock
    }
  }

  if (Number(stakeUSD) !== 0) {
    stakeApr = ((rewardUSDPerDay * 365) / Number(stakeUSD)).toFixed(6)
  }

  if (!farmingData) return

  farmingData.liquidityStaked = liquidityStaked
  farmingData.stakedUSD = stakeUSD
  farmingData.rewardUSDPerDay = rewardUSDRate
  farmingData.stakeApr = stakeApr

  if (poolState?.__kind === 'Dead') {
    ;(farmingData.rewardUSDPerDay = '0'), (farmingData.stakeApr = '0')
  }
  await ctx.store.save(farmingData)

  for (const reward of basicRewardPerDay) {
    if (!reward) continue
    const incentiveId = `${farmingData.id}-${reward.token.id}`
    let incentive = await ctx.store.get(Incentive, {
      where: {
        id: incentiveId,
      },
    })
    if (!incentive) {
      incentive = new Incentive({
        id: incentiveId,
        farm: farmingData,
        rewardToken: reward.token,
        rewardPerDay: reward.rewardPerDay.toFixed(6),
      })
    }
    incentive.rewardPerDay = reward.rewardPerDay.toFixed(6)
    await ctx.store.save(incentive)
  }
}

export async function killFarmingPoolInfo(ctx: EventHandlerContext, pid: bigint) {
  const farmingPoolInfo = await getFamingPoolInfo(ctx, pid, { hash: ctx.block.parentHash })
  const farmingTokens = farmingPoolInfo?.tokensProportion.map((item) => item[0])!
  const farmingToken = farmingTokens[0]
  const assetIdIndex = farmingToken

  const poolState = farmingPoolInfo?.state

  let stakeToken = assetIdIndex.toString()
  const liquidityStaked = farmingPoolInfo?.totalShares ?? 0n

  const timePerBlock = await getTimePerBlock(ctx)

  const blocksPerDay = BigInt(((3600 * 1000 * 24) / timePerBlock).toFixed(0))

  let stakeUSD = '0'
  let rewardUSDRate = '0'

  let stakeApr = '0'

  const basicRewardPerDay = await Promise.all(
    farmingPoolInfo!.basicRewards.map(async (item) => {
      const assetIndex = item[0]
      const token = await getOrCreateToken(ctx, {
        chainId: CHAIN_ID,
        assetType: [BigInt(0), BigInt(1)].includes(assetIndex) ? 0 : 2,
        assetIndex: BigInt(assetIndex),
      })
      if (!token) return
      // const rewardPerDay = item[1] * blocksPerDay
      const rewardPerDay = 0

      const rewardTokenDecimal = convertTokenToDecimal(BigInt(rewardPerDay), token.decimals)
      return {
        token,
        rewardPerDay: rewardTokenDecimal,
      }
    }),
  )

  const basicRewardEthPerDay = await Promise.all(
    farmingPoolInfo!.basicRewards.map(async (item) => {
      const assetIndex = item[0]
      const token = await getOrCreateToken(ctx, {
        chainId: CHAIN_ID,
        assetType: [BigInt(0), BigInt(1)].includes(assetIndex) ? 0 : 2,
        assetIndex: BigInt(assetIndex),
      })
      if (!token) return '0'
      // const rewardPerDay = item[1] * blocksPerDay
      const rewardPerDay = 0

      const rewardTokenDecimal = convertTokenToDecimal(BigInt(rewardPerDay), token.decimals)
      const rewardEth = rewardTokenDecimal.times(token.derivedETH).toFixed(6)
      return rewardEth
    }),
  )

  const rewardEthPerDay = basicRewardEthPerDay.reduce((total, cur) => {
    return total + Number(cur)
  }, 0)

  let bundle = await ctx.store.get(Bundle, '1')
  let rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

  let farmingData: Farm | undefined

  const lpToAssetIdPairStorage = new AssetManagerLpToAssetIdPairStorage(ctx)

  const lpToken = await lpToAssetIdPairStorage.asV4100.get(farmingToken)

  if (lpToken) {
    const [token0Index, token1Index] = lpToken

    const _asset0 = assetIdAdaptZenlink(CHAIN_ID, token0Index)
    const _asset1 = assetIdAdaptZenlink(CHAIN_ID, token1Index)
    const [asset0, asset1] = sortAssets([_asset0, _asset1])
    let pair = await getPair(ctx, [asset0, asset1])
    if (pair) {
      await handleLiquiditySync(ctx, pair)
      pair = (await getPair(ctx, [asset0, asset1]))!

      bundle = await ctx.store.get(Bundle, '1')
      rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

      rewardUSDRate = rewardUSDPerDay.toFixed(6)
      stakeToken = pair.id
      const stakedUSD =
        BigInt(pair.totalSupply) === 0n
          ? 0
          : (Number(liquidityStaked) * Number(pair.reserveUSD ?? 0)) / Number(BigInt(pair.totalSupply ?? 0))
      stakeUSD = stakedUSD.toFixed(6)

      const farmingId = `${stakeToken}-${pid}`
      farmingData = await ctx.store.get(Farm, farmingId)
      if (!farmingData) {
        farmingData = new Farm({
          id: farmingId,
          pid: BigInt(pid),
          stakeToken: stakeToken,
          liquidityStaked: liquidityStaked,
          createdAtBlock: BigInt(ctx.block.height),
          createdAtTimestamp: BigInt(ctx.block.timestamp),
          stakedUSD: stakeUSD,
          rewardUSDPerDay: rewardUSDRate,
          stakeApr,
        })
      }
      if (!farmingData.pair) {
        farmingData.pair = pair
      }
    }
  } else {
    // single token
    bundle = await ctx.store.get(Bundle, '1')
    rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)
    rewardUSDRate = rewardUSDPerDay.toFixed(6)

    const token = await getOrCreateToken(ctx, {
      chainId: CHAIN_ID,
      assetType: [BigInt(0), BigInt(1)].includes(assetIdIndex) ? 0 : 2,
      assetIndex: BigInt(assetIdIndex),
    })

    if (!token) return

    let singleTokenLock = await ctx.store.get(SingleTokenLock, {
      where: {
        id: token.id,
      },
    })

    if (!singleTokenLock) {
      singleTokenLock = new SingleTokenLock({
        id: token.id,
        token: token,
        totalLiquidity: '0',
        totalLiquidityETH: '0',
        totalLiquidityUSD: '0',
      })
    }

    stakeToken = token.id
    const stakeTokenDecimal = convertTokenToDecimal(BigInt(liquidityStaked), token.decimals)

    const stakedUSD = stakeTokenDecimal.times(token.derivedETH).times(bundle?.ethPrice ?? 0)
    stakeUSD = stakedUSD.toFixed(6)

    singleTokenLock.totalLiquidity = liquidityStaked.toString()
    singleTokenLock.totalLiquidityETH = stakeTokenDecimal.times(token.derivedETH).toFixed(6)
    singleTokenLock.totalLiquidityUSD = stakeUSD
    await ctx.store.save(singleTokenLock)
    await updateSingleTokenLockHourData(ctx, singleTokenLock)
    await updateSingleTokenLockDayData(ctx, singleTokenLock)

    const farmingId = `${stakeToken}-${pid}`
    farmingData = await ctx.store.get(Farm, farmingId)
    if (!farmingData) {
      farmingData = new Farm({
        id: farmingId,
        pid: BigInt(pid),
        stakeToken: stakeToken,
        liquidityStaked: liquidityStaked,
        createdAtBlock: BigInt(ctx.block.height),
        createdAtTimestamp: BigInt(ctx.block.timestamp),
        stakedUSD: stakeUSD,
        rewardUSDPerDay: rewardUSDRate,
        stakeApr,
      })
    }
    if (!farmingData.singleTokenLock) {
      farmingData.singleTokenLock = singleTokenLock
    }
  }

  if (Number(stakeUSD) !== 0) {
    stakeApr = ((rewardUSDPerDay * 365) / Number(stakeUSD)).toFixed(6)
  }

  if (!farmingData) return

  farmingData.liquidityStaked = liquidityStaked
  farmingData.stakedUSD = stakeUSD
  farmingData.rewardUSDPerDay = rewardUSDRate
  farmingData.stakeApr = stakeApr

  if (poolState?.__kind === 'Dead') {
    ;(farmingData.rewardUSDPerDay = '0'), (farmingData.stakeApr = '0')
  }
  await ctx.store.save(farmingData)

  for (const reward of basicRewardPerDay) {
    if (!reward) continue
    const incentiveId = `${farmingData.id}-${reward.token.id}`
    let incentive = await ctx.store.get(Incentive, {
      where: {
        id: incentiveId,
      },
    })
    if (!incentive) {
      incentive = new Incentive({
        id: incentiveId,
        farm: farmingData,
        rewardToken: reward.token,
        rewardPerDay: reward.rewardPerDay.toFixed(6),
      })
    }
    incentive.rewardPerDay = reward.rewardPerDay.toFixed(6)
    await ctx.store.save(incentive)
  }
}
