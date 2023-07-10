import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v4201 from './v4201'

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
    get isV4201(): boolean {
        return this.getTypeHash() === '479f9a7e6fad1836192baa4f839baa3dc4065fa6d94605ce0922640accbdc5f2'
    }

    /**
     *  AssetId to AssetRegistry Map.
     */
    get asV4201(): AssetManagerAssetIdMetadataStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

/**
 *  AssetId to AssetRegistry Map.
 */
export interface AssetManagerAssetIdMetadataStorageV4201 {
    get(key: bigint): Promise<(v4201.AssetRegistryMetadata | undefined)>
    getAll(): Promise<v4201.AssetRegistryMetadata[]>
    getMany(keys: bigint[]): Promise<(v4201.AssetRegistryMetadata | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v4201.AssetRegistryMetadata][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v4201.AssetRegistryMetadata][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v4201.AssetRegistryMetadata][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v4201.AssetRegistryMetadata][]>
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
    get isV4201(): boolean {
        return this.getTypeHash() === '592dc9b3ea1a4903d17785caeea1426f0abf5907f22d8a59309b94d2b2d457dc'
    }

    /**
     *  LP asset id to asset id pair mapping.
     */
    get asV4201(): AssetManagerLpToAssetIdPairStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

/**
 *  LP asset id to asset id pair mapping.
 */
export interface AssetManagerLpToAssetIdPairStorageV4201 {
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
    get isV4201(): boolean {
        return this.getTypeHash() === 'dec6aca263f1b254f4e1f2c19f138a595b9f6914e2e28b6841961a6a24518d9f'
    }

    /**
     *  The holdings of a specific account for a specific asset.
     */
    get asV4201(): AssetsAccountStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

/**
 *  The holdings of a specific account for a specific asset.
 */
export interface AssetsAccountStorageV4201 {
    get(key1: bigint, key2: Uint8Array): Promise<(v4201.AssetAccount | undefined)>
    getAll(): Promise<v4201.AssetAccount[]>
    getMany(keys: [bigint, Uint8Array][]): Promise<(v4201.AssetAccount | undefined)[]>
    getKeys(): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint, key2: Uint8Array): Promise<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[bigint, Uint8Array][]>
    getPairs(): Promise<[k: [bigint, Uint8Array], v: v4201.AssetAccount][]>
    getPairs(key1: bigint): Promise<[k: [bigint, Uint8Array], v: v4201.AssetAccount][]>
    getPairs(key1: bigint, key2: Uint8Array): Promise<[k: [bigint, Uint8Array], v: v4201.AssetAccount][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [bigint, Uint8Array], v: v4201.AssetAccount][]>
    getPairsPaged(pageSize: number, key1: bigint): AsyncIterable<[k: [bigint, Uint8Array], v: v4201.AssetAccount][]>
    getPairsPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[k: [bigint, Uint8Array], v: v4201.AssetAccount][]>
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
    get isV4201(): boolean {
        return this.getTypeHash() === '725438ae5f03c56c59785767933695c0b6ca519ecc7c8bc7af981c676867483b'
    }

    /**
     *  Details of an asset.
     */
    get asV4201(): AssetsAssetStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

/**
 *  Details of an asset.
 */
export interface AssetsAssetStorageV4201 {
    get(key: bigint): Promise<(v4201.AssetDetails | undefined)>
    getAll(): Promise<v4201.AssetDetails[]>
    getMany(keys: bigint[]): Promise<(v4201.AssetDetails | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v4201.AssetDetails][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v4201.AssetDetails][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v4201.AssetDetails][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v4201.AssetDetails][]>
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
    get isV4201(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units issued in the system.
     */
    get asV4201(): BalancesTotalIssuanceStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

/**
 *  The total units issued in the system.
 */
export interface BalancesTotalIssuanceStorageV4201 {
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
     *  Record gauge info for specific `AccountId` under `PoolId`.
     * 
     *  double_map (PoolId, AccountId) => GaugeInfo
     */
    get isV4201(): boolean {
        return this.getTypeHash() === 'c9a6639686600b46831142020a3d19ad39b60f7c74ab1ed83b072c7296e9c4be'
    }

    /**
     *  Record gauge info for specific `AccountId` under `PoolId`.
     * 
     *  double_map (PoolId, AccountId) => GaugeInfo
     */
    get asV4201(): FarmingGaugeInfosStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

/**
 *  Record gauge info for specific `AccountId` under `PoolId`.
 * 
 *  double_map (PoolId, AccountId) => GaugeInfo
 */
export interface FarmingGaugeInfosStorageV4201 {
    get(key1: bigint, key2: Uint8Array): Promise<(v4201.GaugeInfo | undefined)>
    getAll(): Promise<v4201.GaugeInfo[]>
    getMany(keys: [bigint, Uint8Array][]): Promise<(v4201.GaugeInfo | undefined)[]>
    getKeys(): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint, key2: Uint8Array): Promise<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[bigint, Uint8Array][]>
    getPairs(): Promise<[k: [bigint, Uint8Array], v: v4201.GaugeInfo][]>
    getPairs(key1: bigint): Promise<[k: [bigint, Uint8Array], v: v4201.GaugeInfo][]>
    getPairs(key1: bigint, key2: Uint8Array): Promise<[k: [bigint, Uint8Array], v: v4201.GaugeInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [bigint, Uint8Array], v: v4201.GaugeInfo][]>
    getPairsPaged(pageSize: number, key1: bigint): AsyncIterable<[k: [bigint, Uint8Array], v: v4201.GaugeInfo][]>
    getPairsPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[k: [bigint, Uint8Array], v: v4201.GaugeInfo][]>
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
    get isV4201(): boolean {
        return this.getTypeHash() === '263df3f033fac46ed1e8154451b41dbe877235be52fa8ab3b07424431c077f17'
    }

    /**
     *  Record gauge farming pool info.
     * 
     *  map PoolId => GaugePoolInfo
     */
    get asV4201(): FarmingGaugePoolInfosStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

/**
 *  Record gauge farming pool info.
 * 
 *  map PoolId => GaugePoolInfo
 */
export interface FarmingGaugePoolInfosStorageV4201 {
    get(key: bigint): Promise<(v4201.GaugePoolInfo | undefined)>
    getAll(): Promise<v4201.GaugePoolInfo[]>
    getMany(keys: bigint[]): Promise<(v4201.GaugePoolInfo | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v4201.GaugePoolInfo][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v4201.GaugePoolInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v4201.GaugePoolInfo][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v4201.GaugePoolInfo][]>
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
    get isV4201(): boolean {
        return this.getTypeHash() === '298b5dc892bbe158421685e957cebb7d7c583f9e1f5563c17570ba3a853e16df'
    }

    /**
     *  Record reward pool info.
     * 
     *  map PoolId => PoolInfo
     */
    get asV4201(): FarmingPoolInfosStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

/**
 *  Record reward pool info.
 * 
 *  map PoolId => PoolInfo
 */
export interface FarmingPoolInfosStorageV4201 {
    get(key: bigint): Promise<(v4201.PoolInfo | undefined)>
    getAll(): Promise<v4201.PoolInfo[]>
    getMany(keys: bigint[]): Promise<(v4201.PoolInfo | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v4201.PoolInfo][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v4201.PoolInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v4201.PoolInfo][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v4201.PoolInfo][]>
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
    get isV4201(): boolean {
        return this.getTypeHash() === 'cb144252e347dd7189e22fa5a689bd8004b5a5e2ce9891a8344b3eee011b5465'
    }

    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     * 
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    get asV4201(): FarmingSharesAndWithdrawnRewardsStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 * 
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface FarmingSharesAndWithdrawnRewardsStorageV4201 {
    get(key1: bigint, key2: Uint8Array): Promise<(v4201.ShareInfo | undefined)>
    getAll(): Promise<v4201.ShareInfo[]>
    getMany(keys: [bigint, Uint8Array][]): Promise<(v4201.ShareInfo | undefined)[]>
    getKeys(): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint, key2: Uint8Array): Promise<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[bigint, Uint8Array][]>
    getPairs(): Promise<[k: [bigint, Uint8Array], v: v4201.ShareInfo][]>
    getPairs(key1: bigint): Promise<[k: [bigint, Uint8Array], v: v4201.ShareInfo][]>
    getPairs(key1: bigint, key2: Uint8Array): Promise<[k: [bigint, Uint8Array], v: v4201.ShareInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [bigint, Uint8Array], v: v4201.ShareInfo][]>
    getPairsPaged(pageSize: number, key1: bigint): AsyncIterable<[k: [bigint, Uint8Array], v: v4201.ShareInfo][]>
    getPairsPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[k: [bigint, Uint8Array], v: v4201.ShareInfo][]>
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
    get isV4201(): boolean {
        return this.getTypeHash() === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV4201(): SystemAccountStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV4201 {
    get(key: Uint8Array): Promise<v4201.AccountInfo>
    getAll(): Promise<v4201.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v4201.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v4201.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v4201.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v4201.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v4201.AccountInfo][]>
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
    get isV4201(): boolean {
        return this.getTypeHash() === '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
    }

    /**
     *  Map of block numbers to block hashes.
     */
    get asV4201(): SystemBlockHashStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

/**
 *  Map of block numbers to block hashes.
 */
export interface SystemBlockHashStorageV4201 {
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
    get isV4201(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Current time for the current block.
     */
    get asV4201(): TimestampNowStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

/**
 *  Current time for the current block.
 */
export interface TimestampNowStorageV4201 {
    get(): Promise<bigint>
}

export class ZenlinkProtocolLiquidityPairsStorage extends StorageBase {
    protected getPrefix() {
        return 'ZenlinkProtocol'
    }

    protected getName() {
        return 'LiquidityPairs'
    }

    get isV4201(): boolean {
        return this.getTypeHash() === '789cf3f60e0a697e380821675a1d5385e419abba09e35755b95a3eb7b5a28f1f'
    }

    get asV4201(): ZenlinkProtocolLiquidityPairsStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

export interface ZenlinkProtocolLiquidityPairsStorageV4201 {
    get(key: [v4201.AssetId, v4201.AssetId]): Promise<(v4201.AssetId | undefined)>
    getAll(): Promise<(v4201.AssetId | undefined)[]>
    getMany(keys: [v4201.AssetId, v4201.AssetId][]): Promise<(v4201.AssetId | undefined)[]>
    getKeys(): Promise<[v4201.AssetId, v4201.AssetId][]>
    getKeys(key: [v4201.AssetId, v4201.AssetId]): Promise<[v4201.AssetId, v4201.AssetId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v4201.AssetId, v4201.AssetId][]>
    getKeysPaged(pageSize: number, key: [v4201.AssetId, v4201.AssetId]): AsyncIterable<[v4201.AssetId, v4201.AssetId][]>
    getPairs(): Promise<[k: [v4201.AssetId, v4201.AssetId], v: (v4201.AssetId | undefined)][]>
    getPairs(key: [v4201.AssetId, v4201.AssetId]): Promise<[k: [v4201.AssetId, v4201.AssetId], v: (v4201.AssetId | undefined)][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v4201.AssetId, v4201.AssetId], v: (v4201.AssetId | undefined)][]>
    getPairsPaged(pageSize: number, key: [v4201.AssetId, v4201.AssetId]): AsyncIterable<[k: [v4201.AssetId, v4201.AssetId], v: (v4201.AssetId | undefined)][]>
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
    get isV4201(): boolean {
        return this.getTypeHash() === 'bad89eddde62d5d40bc938d63d2495e173228abf7011695d72c252612979bde7'
    }

    /**
     *  (T::AssetId, T::AssetId) -> PairStatus
     */
    get asV4201(): ZenlinkProtocolPairStatusesStorageV4201 {
        assert(this.isV4201)
        return this as any
    }
}

/**
 *  (T::AssetId, T::AssetId) -> PairStatus
 */
export interface ZenlinkProtocolPairStatusesStorageV4201 {
    get(key: [v4201.AssetId, v4201.AssetId]): Promise<v4201.PairStatus>
    getAll(): Promise<v4201.PairStatus[]>
    getMany(keys: [v4201.AssetId, v4201.AssetId][]): Promise<v4201.PairStatus[]>
    getKeys(): Promise<[v4201.AssetId, v4201.AssetId][]>
    getKeys(key: [v4201.AssetId, v4201.AssetId]): Promise<[v4201.AssetId, v4201.AssetId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v4201.AssetId, v4201.AssetId][]>
    getKeysPaged(pageSize: number, key: [v4201.AssetId, v4201.AssetId]): AsyncIterable<[v4201.AssetId, v4201.AssetId][]>
    getPairs(): Promise<[k: [v4201.AssetId, v4201.AssetId], v: v4201.PairStatus][]>
    getPairs(key: [v4201.AssetId, v4201.AssetId]): Promise<[k: [v4201.AssetId, v4201.AssetId], v: v4201.PairStatus][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v4201.AssetId, v4201.AssetId], v: v4201.PairStatus][]>
    getPairsPaged(pageSize: number, key: [v4201.AssetId, v4201.AssetId]): AsyncIterable<[k: [v4201.AssetId, v4201.AssetId], v: v4201.PairStatus][]>
}
