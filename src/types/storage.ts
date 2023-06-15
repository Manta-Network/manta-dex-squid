import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v4100 from './v4100'

export class AssetManagerAssetIdMetadataStorage extends StorageBase {
    protected getPrefix() {
        return 'AssetManager'
    }

    protected getName() {
        return 'AssetIdMetadata'
    }

    /**
     *  AssetId to AssetRegistry Map.
     */
    get isV4100(): boolean {
        return this.getTypeHash() === '479f9a7e6fad1836192baa4f839baa3dc4065fa6d94605ce0922640accbdc5f2'
    }

    /**
     *  AssetId to AssetRegistry Map.
     */
    get asV4100(): AssetManagerAssetIdMetadataStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

/**
 *  AssetId to AssetRegistry Map.
 */
export interface AssetManagerAssetIdMetadataStorageV4100 {
    get(key: bigint): Promise<(v4100.AssetRegistryMetadata | undefined)>
    getAll(): Promise<v4100.AssetRegistryMetadata[]>
    getMany(keys: bigint[]): Promise<(v4100.AssetRegistryMetadata | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v4100.AssetRegistryMetadata][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v4100.AssetRegistryMetadata][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v4100.AssetRegistryMetadata][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v4100.AssetRegistryMetadata][]>
}

export class AssetManagerLpToAssetIdPairStorage extends StorageBase {
    protected getPrefix() {
        return 'AssetManager'
    }

    protected getName() {
        return 'LpToAssetIdPair'
    }

    /**
     *  LP asset id to asset id pair mapping.
     */
    get isV4100(): boolean {
        return this.getTypeHash() === '592dc9b3ea1a4903d17785caeea1426f0abf5907f22d8a59309b94d2b2d457dc'
    }

    /**
     *  LP asset id to asset id pair mapping.
     */
    get asV4100(): AssetManagerLpToAssetIdPairStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

/**
 *  LP asset id to asset id pair mapping.
 */
export interface AssetManagerLpToAssetIdPairStorageV4100 {
    get(key: bigint): Promise<([bigint, bigint] | undefined)>
    getAll(): Promise<[bigint, bigint][]>
    getMany(keys: bigint[]): Promise<([bigint, bigint] | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: [bigint, bigint]][]>
    getPairs(key: bigint): Promise<[k: bigint, v: [bigint, bigint]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: [bigint, bigint]][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: [bigint, bigint]][]>
}

export class AssetsAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'Assets'
    }

    protected getName() {
        return 'Account'
    }

    /**
     *  The holdings of a specific account for a specific asset.
     */
    get isV4100(): boolean {
        return this.getTypeHash() === 'dec6aca263f1b254f4e1f2c19f138a595b9f6914e2e28b6841961a6a24518d9f'
    }

    /**
     *  The holdings of a specific account for a specific asset.
     */
    get asV4100(): AssetsAccountStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

/**
 *  The holdings of a specific account for a specific asset.
 */
export interface AssetsAccountStorageV4100 {
    get(key1: bigint, key2: Uint8Array): Promise<(v4100.AssetAccount | undefined)>
    getAll(): Promise<v4100.AssetAccount[]>
    getMany(keys: [bigint, Uint8Array][]): Promise<(v4100.AssetAccount | undefined)[]>
    getKeys(): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint, key2: Uint8Array): Promise<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[bigint, Uint8Array][]>
    getPairs(): Promise<[k: [bigint, Uint8Array], v: v4100.AssetAccount][]>
    getPairs(key1: bigint): Promise<[k: [bigint, Uint8Array], v: v4100.AssetAccount][]>
    getPairs(key1: bigint, key2: Uint8Array): Promise<[k: [bigint, Uint8Array], v: v4100.AssetAccount][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [bigint, Uint8Array], v: v4100.AssetAccount][]>
    getPairsPaged(pageSize: number, key1: bigint): AsyncIterable<[k: [bigint, Uint8Array], v: v4100.AssetAccount][]>
    getPairsPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[k: [bigint, Uint8Array], v: v4100.AssetAccount][]>
}

export class AssetsAssetStorage extends StorageBase {
    protected getPrefix() {
        return 'Assets'
    }

    protected getName() {
        return 'Asset'
    }

    /**
     *  Details of an asset.
     */
    get isV4100(): boolean {
        return this.getTypeHash() === '725438ae5f03c56c59785767933695c0b6ca519ecc7c8bc7af981c676867483b'
    }

    /**
     *  Details of an asset.
     */
    get asV4100(): AssetsAssetStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

/**
 *  Details of an asset.
 */
export interface AssetsAssetStorageV4100 {
    get(key: bigint): Promise<(v4100.AssetDetails | undefined)>
    getAll(): Promise<v4100.AssetDetails[]>
    getMany(keys: bigint[]): Promise<(v4100.AssetDetails | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v4100.AssetDetails][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v4100.AssetDetails][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v4100.AssetDetails][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v4100.AssetDetails][]>
}

export class BalancesTotalIssuanceStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'TotalIssuance'
    }

    /**
     *  The total units issued in the system.
     */
    get isV4100(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units issued in the system.
     */
    get asV4100(): BalancesTotalIssuanceStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

/**
 *  The total units issued in the system.
 */
export interface BalancesTotalIssuanceStorageV4100 {
    get(): Promise<bigint>
}

export class FarmingGaugeInfosStorage extends StorageBase {
    protected getPrefix() {
        return 'Farming'
    }

    protected getName() {
        return 'GaugeInfos'
    }

    /**
     * 
     */
    get isV4100(): boolean {
        return this.getTypeHash() === 'c9a6639686600b46831142020a3d19ad39b60f7c74ab1ed83b072c7296e9c4be'
    }

    /**
     * 
     */
    get asV4100(): FarmingGaugeInfosStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

/**
 * 
 */
export interface FarmingGaugeInfosStorageV4100 {
    get(key1: bigint, key2: Uint8Array): Promise<(v4100.GaugeInfo | undefined)>
    getAll(): Promise<v4100.GaugeInfo[]>
    getMany(keys: [bigint, Uint8Array][]): Promise<(v4100.GaugeInfo | undefined)[]>
    getKeys(): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint, key2: Uint8Array): Promise<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[bigint, Uint8Array][]>
    getPairs(): Promise<[k: [bigint, Uint8Array], v: v4100.GaugeInfo][]>
    getPairs(key1: bigint): Promise<[k: [bigint, Uint8Array], v: v4100.GaugeInfo][]>
    getPairs(key1: bigint, key2: Uint8Array): Promise<[k: [bigint, Uint8Array], v: v4100.GaugeInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [bigint, Uint8Array], v: v4100.GaugeInfo][]>
    getPairsPaged(pageSize: number, key1: bigint): AsyncIterable<[k: [bigint, Uint8Array], v: v4100.GaugeInfo][]>
    getPairsPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[k: [bigint, Uint8Array], v: v4100.GaugeInfo][]>
}

export class FarmingGaugePoolInfosStorage extends StorageBase {
    protected getPrefix() {
        return 'Farming'
    }

    protected getName() {
        return 'GaugePoolInfos'
    }

    /**
     *  Record gauge farming pool info.
     * 
     *  map PoolId => GaugePoolInfo
     */
    get isV4100(): boolean {
        return this.getTypeHash() === '9ac9d479497ae82e84705df9d5918e19be62ffe1c87c0a9618c44175e7c707a2'
    }

    /**
     *  Record gauge farming pool info.
     * 
     *  map PoolId => GaugePoolInfo
     */
    get asV4100(): FarmingGaugePoolInfosStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

/**
 *  Record gauge farming pool info.
 * 
 *  map PoolId => GaugePoolInfo
 */
export interface FarmingGaugePoolInfosStorageV4100 {
    get(key: bigint): Promise<(v4100.GaugePoolInfo | undefined)>
    getAll(): Promise<v4100.GaugePoolInfo[]>
    getMany(keys: bigint[]): Promise<(v4100.GaugePoolInfo | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v4100.GaugePoolInfo][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v4100.GaugePoolInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v4100.GaugePoolInfo][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v4100.GaugePoolInfo][]>
}

export class FarmingPoolInfosStorage extends StorageBase {
    protected getPrefix() {
        return 'Farming'
    }

    protected getName() {
        return 'PoolInfos'
    }

    /**
     *  Record reward pool info.
     * 
     *  map PoolId => PoolInfo
     */
    get isV4100(): boolean {
        return this.getTypeHash() === '298b5dc892bbe158421685e957cebb7d7c583f9e1f5563c17570ba3a853e16df'
    }

    /**
     *  Record reward pool info.
     * 
     *  map PoolId => PoolInfo
     */
    get asV4100(): FarmingPoolInfosStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

/**
 *  Record reward pool info.
 * 
 *  map PoolId => PoolInfo
 */
export interface FarmingPoolInfosStorageV4100 {
    get(key: bigint): Promise<(v4100.PoolInfo | undefined)>
    getAll(): Promise<v4100.PoolInfo[]>
    getMany(keys: bigint[]): Promise<(v4100.PoolInfo | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v4100.PoolInfo][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v4100.PoolInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v4100.PoolInfo][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v4100.PoolInfo][]>
}

export class FarmingSharesAndWithdrawnRewardsStorage extends StorageBase {
    protected getPrefix() {
        return 'Farming'
    }

    protected getName() {
        return 'SharesAndWithdrawnRewards'
    }

    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     * 
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    get isV4100(): boolean {
        return this.getTypeHash() === 'cb144252e347dd7189e22fa5a689bd8004b5a5e2ce9891a8344b3eee011b5465'
    }

    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     * 
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    get asV4100(): FarmingSharesAndWithdrawnRewardsStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 * 
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface FarmingSharesAndWithdrawnRewardsStorageV4100 {
    get(key1: bigint, key2: Uint8Array): Promise<(v4100.ShareInfo | undefined)>
    getAll(): Promise<v4100.ShareInfo[]>
    getMany(keys: [bigint, Uint8Array][]): Promise<(v4100.ShareInfo | undefined)[]>
    getKeys(): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint, key2: Uint8Array): Promise<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[bigint, Uint8Array][]>
    getPairs(): Promise<[k: [bigint, Uint8Array], v: v4100.ShareInfo][]>
    getPairs(key1: bigint): Promise<[k: [bigint, Uint8Array], v: v4100.ShareInfo][]>
    getPairs(key1: bigint, key2: Uint8Array): Promise<[k: [bigint, Uint8Array], v: v4100.ShareInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [bigint, Uint8Array], v: v4100.ShareInfo][]>
    getPairsPaged(pageSize: number, key1: bigint): AsyncIterable<[k: [bigint, Uint8Array], v: v4100.ShareInfo][]>
    getPairsPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[k: [bigint, Uint8Array], v: v4100.ShareInfo][]>
}

export class SystemAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Account'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV4100(): boolean {
        return this.getTypeHash() === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV4100(): SystemAccountStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV4100 {
    get(key: Uint8Array): Promise<v4100.AccountInfo>
    getAll(): Promise<v4100.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v4100.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v4100.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v4100.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v4100.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v4100.AccountInfo][]>
}

export class SystemBlockHashStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'BlockHash'
    }

    /**
     *  Map of block numbers to block hashes.
     */
    get isV4100(): boolean {
        return this.getTypeHash() === '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
    }

    /**
     *  Map of block numbers to block hashes.
     */
    get asV4100(): SystemBlockHashStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

/**
 *  Map of block numbers to block hashes.
 */
export interface SystemBlockHashStorageV4100 {
    get(key: number): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: number[]): Promise<Uint8Array[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: Uint8Array][]>
    getPairs(key: number): Promise<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: Uint8Array][]>
}

export class TimestampNowStorage extends StorageBase {
    protected getPrefix() {
        return 'Timestamp'
    }

    protected getName() {
        return 'Now'
    }

    /**
     *  Current time for the current block.
     */
    get isV4100(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Current time for the current block.
     */
    get asV4100(): TimestampNowStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

/**
 *  Current time for the current block.
 */
export interface TimestampNowStorageV4100 {
    get(): Promise<bigint>
}

export class ZenlinkProtocolLiquidityPairsStorage extends StorageBase {
    protected getPrefix() {
        return 'ZenlinkProtocol'
    }

    protected getName() {
        return 'LiquidityPairs'
    }

    get isV4100(): boolean {
        return this.getTypeHash() === '789cf3f60e0a697e380821675a1d5385e419abba09e35755b95a3eb7b5a28f1f'
    }

    get asV4100(): ZenlinkProtocolLiquidityPairsStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

export interface ZenlinkProtocolLiquidityPairsStorageV4100 {
    get(key: [v4100.AssetId, v4100.AssetId]): Promise<(v4100.AssetId | undefined)>
    getAll(): Promise<(v4100.AssetId | undefined)[]>
    getMany(keys: [v4100.AssetId, v4100.AssetId][]): Promise<(v4100.AssetId | undefined)[]>
    getKeys(): Promise<[v4100.AssetId, v4100.AssetId][]>
    getKeys(key: [v4100.AssetId, v4100.AssetId]): Promise<[v4100.AssetId, v4100.AssetId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v4100.AssetId, v4100.AssetId][]>
    getKeysPaged(pageSize: number, key: [v4100.AssetId, v4100.AssetId]): AsyncIterable<[v4100.AssetId, v4100.AssetId][]>
    getPairs(): Promise<[k: [v4100.AssetId, v4100.AssetId], v: (v4100.AssetId | undefined)][]>
    getPairs(key: [v4100.AssetId, v4100.AssetId]): Promise<[k: [v4100.AssetId, v4100.AssetId], v: (v4100.AssetId | undefined)][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v4100.AssetId, v4100.AssetId], v: (v4100.AssetId | undefined)][]>
    getPairsPaged(pageSize: number, key: [v4100.AssetId, v4100.AssetId]): AsyncIterable<[k: [v4100.AssetId, v4100.AssetId], v: (v4100.AssetId | undefined)][]>
}

export class ZenlinkProtocolPairStatusesStorage extends StorageBase {
    protected getPrefix() {
        return 'ZenlinkProtocol'
    }

    protected getName() {
        return 'PairStatuses'
    }

    /**
     *  (T::AssetId, T::AssetId) -> PairStatus
     */
    get isV4100(): boolean {
        return this.getTypeHash() === 'bad89eddde62d5d40bc938d63d2495e173228abf7011695d72c252612979bde7'
    }

    /**
     *  (T::AssetId, T::AssetId) -> PairStatus
     */
    get asV4100(): ZenlinkProtocolPairStatusesStorageV4100 {
        assert(this.isV4100)
        return this as any
    }
}

/**
 *  (T::AssetId, T::AssetId) -> PairStatus
 */
export interface ZenlinkProtocolPairStatusesStorageV4100 {
    get(key: [v4100.AssetId, v4100.AssetId]): Promise<v4100.PairStatus>
    getAll(): Promise<v4100.PairStatus[]>
    getMany(keys: [v4100.AssetId, v4100.AssetId][]): Promise<v4100.PairStatus[]>
    getKeys(): Promise<[v4100.AssetId, v4100.AssetId][]>
    getKeys(key: [v4100.AssetId, v4100.AssetId]): Promise<[v4100.AssetId, v4100.AssetId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v4100.AssetId, v4100.AssetId][]>
    getKeysPaged(pageSize: number, key: [v4100.AssetId, v4100.AssetId]): AsyncIterable<[v4100.AssetId, v4100.AssetId][]>
    getPairs(): Promise<[k: [v4100.AssetId, v4100.AssetId], v: v4100.PairStatus][]>
    getPairs(key: [v4100.AssetId, v4100.AssetId]): Promise<[k: [v4100.AssetId, v4100.AssetId], v: v4100.PairStatus][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v4100.AssetId, v4100.AssetId], v: v4100.PairStatus][]>
    getPairsPaged(pageSize: number, key: [v4100.AssetId, v4100.AssetId]): AsyncIterable<[k: [v4100.AssetId, v4100.AssetId], v: v4100.PairStatus][]>
}
