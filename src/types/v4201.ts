import type {Result, Option} from './support'

export interface AssetId {
    chainId: number
    assetType: number
    assetIndex: bigint
}

export interface AssetRegistryMetadata {
    metadata: AssetStorageMetadata
    minBalance: bigint
    isSufficient: boolean
}

export interface AssetAccount {
    balance: bigint
    isFrozen: boolean
    reason: ExistenceReason
}

export interface AssetDetails {
    owner: Uint8Array
    issuer: Uint8Array
    admin: Uint8Array
    freezer: Uint8Array
    supply: bigint
    deposit: bigint
    minBalance: bigint
    isSufficient: boolean
    accounts: number
    sufficients: number
    approvals: number
    status: AssetStatus
}

export interface GaugeInfo {
    who: Uint8Array
    gaugeAmount: bigint
    totalTimeFactor: bigint
    latestTimeFactor: bigint
    claimedTimeFactor: bigint
    gaugeStartBlock: number
    gaugeStopBlock: number
    gaugeLastBlock: number
    lastClaimBlock: number
}

export interface GaugePoolInfo {
    poolId: bigint
    token: bigint
    keeper: Uint8Array
    rewardIssuer: Uint8Array
    rewards: [bigint, [bigint, bigint, bigint]][]
    gaugeBasicRewards: [bigint, bigint][]
    maxBlock: number
    gaugeAmount: bigint
    totalTimeFactor: bigint
    gaugeState: GaugeState
    gaugeLastBlock: number
}

export interface PoolInfo {
    tokensProportion: [bigint, number][]
    basicToken: [bigint, number]
    totalShares: bigint
    basicRewards: [bigint, bigint][]
    rewards: [bigint, [bigint, bigint]][]
    state: PoolState
    keeper: Uint8Array
    rewardIssuer: Uint8Array
    gauge: (bigint | undefined)
    blockStartup: (number | undefined)
    minDepositToStart: bigint
    afterBlockToStart: number
    withdrawLimitTime: number
    claimLimitTime: number
    withdrawLimitCount: number
}

export interface ShareInfo {
    who: Uint8Array
    share: bigint
    withdrawnRewards: [bigint, bigint][]
    claimLastBlock: number
    withdrawList: [number, bigint][]
}

export interface AccountInfo {
    nonce: number
    consumers: number
    providers: number
    sufficients: number
    data: AccountData
}

export type PairStatus = PairStatus_Trading | PairStatus_Bootstrap | PairStatus_Disable

export interface PairStatus_Trading {
    __kind: 'Trading'
    value: PairMetadata
}

export interface PairStatus_Bootstrap {
    __kind: 'Bootstrap'
    value: BootstrapParameter
}

export interface PairStatus_Disable {
    __kind: 'Disable'
}

export interface AssetStorageMetadata {
    name: Uint8Array
    symbol: Uint8Array
    decimals: number
    isFrozen: boolean
}

export type ExistenceReason = ExistenceReason_Consumer | ExistenceReason_Sufficient | ExistenceReason_DepositHeld | ExistenceReason_DepositRefunded

export interface ExistenceReason_Consumer {
    __kind: 'Consumer'
}

export interface ExistenceReason_Sufficient {
    __kind: 'Sufficient'
}

export interface ExistenceReason_DepositHeld {
    __kind: 'DepositHeld'
    value: bigint
}

export interface ExistenceReason_DepositRefunded {
    __kind: 'DepositRefunded'
}

export type AssetStatus = AssetStatus_Live | AssetStatus_Frozen | AssetStatus_Destroying

export interface AssetStatus_Live {
    __kind: 'Live'
}

export interface AssetStatus_Frozen {
    __kind: 'Frozen'
}

export interface AssetStatus_Destroying {
    __kind: 'Destroying'
}

export type GaugeState = GaugeState_Unbond | GaugeState_Bonded

export interface GaugeState_Unbond {
    __kind: 'Unbond'
}

export interface GaugeState_Bonded {
    __kind: 'Bonded'
}

export type PoolState = PoolState_UnCharged | PoolState_Charged | PoolState_Ongoing | PoolState_Dead | PoolState_Retired

export interface PoolState_UnCharged {
    __kind: 'UnCharged'
}

export interface PoolState_Charged {
    __kind: 'Charged'
}

export interface PoolState_Ongoing {
    __kind: 'Ongoing'
}

export interface PoolState_Dead {
    __kind: 'Dead'
}

export interface PoolState_Retired {
    __kind: 'Retired'
}

export interface AccountData {
    free: bigint
    reserved: bigint
    miscFrozen: bigint
    feeFrozen: bigint
}

export interface PairMetadata {
    pairAccount: Uint8Array
    totalSupply: bigint
}

export interface BootstrapParameter {
    targetSupply: [bigint, bigint]
    capacitySupply: [bigint, bigint]
    accumulatedSupply: [bigint, bigint]
    endBlockNumber: number
    pairAccount: Uint8Array
}
