import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v4401 from './v4401'
import * as v4600 from './v4600'

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
    get isV4401(): boolean {
        return this.getTypeHash() === '479f9a7e6fad1836192baa4f839baa3dc4065fa6d94605ce0922640accbdc5f2'
    }

    /**
     *  AssetId to AssetRegistry Map.
     */
    get asV4401(): AssetManagerAssetIdMetadataStorageV4401 {
        assert(this.isV4401)
        return this as any
    }
}

/**
 *  AssetId to AssetRegistry Map.
 */
export interface AssetManagerAssetIdMetadataStorageV4401 {
    get(key: bigint): Promise<(v4401.AssetRegistryMetadata | undefined)>
    getAll(): Promise<v4401.AssetRegistryMetadata[]>
    getMany(keys: bigint[]): Promise<(v4401.AssetRegistryMetadata | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v4401.AssetRegistryMetadata][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v4401.AssetRegistryMetadata][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v4401.AssetRegistryMetadata][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v4401.AssetRegistryMetadata][]>
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
    get isV4401(): boolean {
        return this.getTypeHash() === '592dc9b3ea1a4903d17785caeea1426f0abf5907f22d8a59309b94d2b2d457dc'
    }

    /**
     *  LP asset id to asset id pair mapping.
     */
    get asV4401(): AssetManagerLpToAssetIdPairStorageV4401 {
        assert(this.isV4401)
        return this as any
    }
}

/**
 *  LP asset id to asset id pair mapping.
 */
export interface AssetManagerLpToAssetIdPairStorageV4401 {
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
    get isV4401(): boolean {
        return this.getTypeHash() === 'dec6aca263f1b254f4e1f2c19f138a595b9f6914e2e28b6841961a6a24518d9f'
    }

    /**
     *  The holdings of a specific account for a specific asset.
     */
    get asV4401(): AssetsAccountStorageV4401 {
        assert(this.isV4401)
        return this as any
    }

    /**
     *  The holdings of a specific account for a specific asset.
     */
    get isV4600(): boolean {
        return this.getTypeHash() === 'c101916616470361869ffc454e1716a26043820583af00df688c1a63340d6f00'
    }

    /**
     *  The holdings of a specific account for a specific asset.
     */
    get asV4600(): AssetsAccountStorageV4600 {
        assert(this.isV4600)
        return this as any
    }
}

/**
 *  The holdings of a specific account for a specific asset.
 */
export interface AssetsAccountStorageV4401 {
    get(key1: bigint, key2: Uint8Array): Promise<(v4401.AssetAccount | undefined)>
    getAll(): Promise<v4401.AssetAccount[]>
    getMany(keys: [bigint, Uint8Array][]): Promise<(v4401.AssetAccount | undefined)[]>
    getKeys(): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint, key2: Uint8Array): Promise<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[bigint, Uint8Array][]>
    getPairs(): Promise<[k: [bigint, Uint8Array], v: v4401.AssetAccount][]>
    getPairs(key1: bigint): Promise<[k: [bigint, Uint8Array], v: v4401.AssetAccount][]>
    getPairs(key1: bigint, key2: Uint8Array): Promise<[k: [bigint, Uint8Array], v: v4401.AssetAccount][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [bigint, Uint8Array], v: v4401.AssetAccount][]>
    getPairsPaged(pageSize: number, key1: bigint): AsyncIterable<[k: [bigint, Uint8Array], v: v4401.AssetAccount][]>
    getPairsPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[k: [bigint, Uint8Array], v: v4401.AssetAccount][]>
}

/**
 *  The holdings of a specific account for a specific asset.
 */
export interface AssetsAccountStorageV4600 {
    get(key1: bigint, key2: Uint8Array): Promise<(v4600.AssetAccount | undefined)>
    getAll(): Promise<v4600.AssetAccount[]>
    getMany(keys: [bigint, Uint8Array][]): Promise<(v4600.AssetAccount | undefined)[]>
    getKeys(): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint, key2: Uint8Array): Promise<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[bigint, Uint8Array][]>
    getPairs(): Promise<[k: [bigint, Uint8Array], v: v4600.AssetAccount][]>
    getPairs(key1: bigint): Promise<[k: [bigint, Uint8Array], v: v4600.AssetAccount][]>
    getPairs(key1: bigint, key2: Uint8Array): Promise<[k: [bigint, Uint8Array], v: v4600.AssetAccount][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [bigint, Uint8Array], v: v4600.AssetAccount][]>
    getPairsPaged(pageSize: number, key1: bigint): AsyncIterable<[k: [bigint, Uint8Array], v: v4600.AssetAccount][]>
    getPairsPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[k: [bigint, Uint8Array], v: v4600.AssetAccount][]>
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
    get isV4401(): boolean {
        return this.getTypeHash() === '725438ae5f03c56c59785767933695c0b6ca519ecc7c8bc7af981c676867483b'
    }

    /**
     *  Details of an asset.
     */
    get asV4401(): AssetsAssetStorageV4401 {
        assert(this.isV4401)
        return this as any
    }
}

/**
 *  Details of an asset.
 */
export interface AssetsAssetStorageV4401 {
    get(key: bigint): Promise<(v4401.AssetDetails | undefined)>
    getAll(): Promise<v4401.AssetDetails[]>
    getMany(keys: bigint[]): Promise<(v4401.AssetDetails | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v4401.AssetDetails][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v4401.AssetDetails][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v4401.AssetDetails][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v4401.AssetDetails][]>
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
    get isV4401(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units issued in the system.
     */
    get asV4401(): BalancesTotalIssuanceStorageV4401 {
        assert(this.isV4401)
        return this as any
    }
}

/**
 *  The total units issued in the system.
 */
export interface BalancesTotalIssuanceStorageV4401 {
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
    get isV4401(): boolean {
        return this.getTypeHash() === 'c9a6639686600b46831142020a3d19ad39b60f7c74ab1ed83b072c7296e9c4be'
    }

    /**
     *  Record gauge info for specific `AccountId` under `PoolId`.
     * 
     *  double_map (PoolId, AccountId) => GaugeInfo
     */
    get asV4401(): FarmingGaugeInfosStorageV4401 {
        assert(this.isV4401)
        return this as any
    }
}

/**
 *  Record gauge info for specific `AccountId` under `PoolId`.
 * 
 *  double_map (PoolId, AccountId) => GaugeInfo
 */
export interface FarmingGaugeInfosStorageV4401 {
    get(key1: bigint, key2: Uint8Array): Promise<(v4401.GaugeInfo | undefined)>
    getAll(): Promise<v4401.GaugeInfo[]>
    getMany(keys: [bigint, Uint8Array][]): Promise<(v4401.GaugeInfo | undefined)[]>
    getKeys(): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint, key2: Uint8Array): Promise<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[bigint, Uint8Array][]>
    getPairs(): Promise<[k: [bigint, Uint8Array], v: v4401.GaugeInfo][]>
    getPairs(key1: bigint): Promise<[k: [bigint, Uint8Array], v: v4401.GaugeInfo][]>
    getPairs(key1: bigint, key2: Uint8Array): Promise<[k: [bigint, Uint8Array], v: v4401.GaugeInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [bigint, Uint8Array], v: v4401.GaugeInfo][]>
    getPairsPaged(pageSize: number, key1: bigint): AsyncIterable<[k: [bigint, Uint8Array], v: v4401.GaugeInfo][]>
    getPairsPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[k: [bigint, Uint8Array], v: v4401.GaugeInfo][]>
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
    get isV4401(): boolean {
        return this.getTypeHash() === '263df3f033fac46ed1e8154451b41dbe877235be52fa8ab3b07424431c077f17'
    }

    /**
     *  Record gauge farming pool info.
     * 
     *  map PoolId => GaugePoolInfo
     */
    get asV4401(): FarmingGaugePoolInfosStorageV4401 {
        assert(this.isV4401)
        return this as any
    }
}

/**
 *  Record gauge farming pool info.
 * 
 *  map PoolId => GaugePoolInfo
 */
export interface FarmingGaugePoolInfosStorageV4401 {
    get(key: bigint): Promise<(v4401.GaugePoolInfo | undefined)>
    getAll(): Promise<v4401.GaugePoolInfo[]>
    getMany(keys: bigint[]): Promise<(v4401.GaugePoolInfo | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v4401.GaugePoolInfo][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v4401.GaugePoolInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v4401.GaugePoolInfo][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v4401.GaugePoolInfo][]>
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
    get isV4401(): boolean {
        return this.getTypeHash() === '298b5dc892bbe158421685e957cebb7d7c583f9e1f5563c17570ba3a853e16df'
    }

    /**
     *  Record reward pool info.
     * 
     *  map PoolId => PoolInfo
     */
    get asV4401(): FarmingPoolInfosStorageV4401 {
        assert(this.isV4401)
        return this as any
    }
}

/**
 *  Record reward pool info.
 * 
 *  map PoolId => PoolInfo
 */
export interface FarmingPoolInfosStorageV4401 {
    get(key: bigint): Promise<(v4401.PoolInfo | undefined)>
    getAll(): Promise<v4401.PoolInfo[]>
    getMany(keys: bigint[]): Promise<(v4401.PoolInfo | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v4401.PoolInfo][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v4401.PoolInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v4401.PoolInfo][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v4401.PoolInfo][]>
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
    get isV4401(): boolean {
        return this.getTypeHash() === 'cb144252e347dd7189e22fa5a689bd8004b5a5e2ce9891a8344b3eee011b5465'
    }

    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     * 
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    get asV4401(): FarmingSharesAndWithdrawnRewardsStorageV4401 {
        assert(this.isV4401)
        return this as any
    }
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 * 
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface FarmingSharesAndWithdrawnRewardsStorageV4401 {
    get(key1: bigint, key2: Uint8Array): Promise<(v4401.ShareInfo | undefined)>
    getAll(): Promise<v4401.ShareInfo[]>
    getMany(keys: [bigint, Uint8Array][]): Promise<(v4401.ShareInfo | undefined)[]>
    getKeys(): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint, key2: Uint8Array): Promise<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[bigint, Uint8Array][]>
    getPairs(): Promise<[k: [bigint, Uint8Array], v: v4401.ShareInfo][]>
    getPairs(key1: bigint): Promise<[k: [bigint, Uint8Array], v: v4401.ShareInfo][]>
    getPairs(key1: bigint, key2: Uint8Array): Promise<[k: [bigint, Uint8Array], v: v4401.ShareInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [bigint, Uint8Array], v: v4401.ShareInfo][]>
    getPairsPaged(pageSize: number, key1: bigint): AsyncIterable<[k: [bigint, Uint8Array], v: v4401.ShareInfo][]>
    getPairsPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[k: [bigint, Uint8Array], v: v4401.ShareInfo][]>
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
    get isV4401(): boolean {
        return this.getTypeHash() === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV4401(): SystemAccountStorageV4401 {
        assert(this.isV4401)
        return this as any
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV4600(): boolean {
        return this.getTypeHash() === 'd6b7a816e0cf6dc8f60cb2bd55c5c5ae7ad928521a6e98aafbe6e954f5c54878'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV4600(): SystemAccountStorageV4600 {
        assert(this.isV4600)
        return this as any
    }
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV4401 {
    get(key: Uint8Array): Promise<v4401.AccountInfo>
    getAll(): Promise<v4401.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v4401.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v4401.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v4401.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v4401.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v4401.AccountInfo][]>
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV4600 {
    get(key: Uint8Array): Promise<v4600.AccountInfo>
    getAll(): Promise<v4600.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v4600.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v4600.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v4600.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v4600.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v4600.AccountInfo][]>
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
    get isV4401(): boolean {
        return this.getTypeHash() === '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
    }

    /**
     *  Map of block numbers to block hashes.
     */
    get asV4401(): SystemBlockHashStorageV4401 {
        assert(this.isV4401)
        return this as any
    }
}

/**
 *  Map of block numbers to block hashes.
 */
export interface SystemBlockHashStorageV4401 {
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
    get isV4401(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Current time for the current block.
     */
    get asV4401(): TimestampNowStorageV4401 {
        assert(this.isV4401)
        return this as any
    }
}

/**
 *  Current time for the current block.
 */
export interface TimestampNowStorageV4401 {
    get(): Promise<bigint>
}

export class ZenlinkProtocolLiquidityPairsStorage extends StorageBase {
    protected getPrefix() {
        return 'ZenlinkProtocol'
    }

    protected getName() {
        return 'LiquidityPairs'
    }

    get isV4401(): boolean {
        return this.getTypeHash() === '789cf3f60e0a697e380821675a1d5385e419abba09e35755b95a3eb7b5a28f1f'
    }

    get asV4401(): ZenlinkProtocolLiquidityPairsStorageV4401 {
        assert(this.isV4401)
        return this as any
    }
}

export interface ZenlinkProtocolLiquidityPairsStorageV4401 {
    get(key: [v4401.AssetId, v4401.AssetId]): Promise<(v4401.AssetId | undefined)>
    getAll(): Promise<(v4401.AssetId | undefined)[]>
    getMany(keys: [v4401.AssetId, v4401.AssetId][]): Promise<(v4401.AssetId | undefined)[]>
    getKeys(): Promise<[v4401.AssetId, v4401.AssetId][]>
    getKeys(key: [v4401.AssetId, v4401.AssetId]): Promise<[v4401.AssetId, v4401.AssetId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v4401.AssetId, v4401.AssetId][]>
    getKeysPaged(pageSize: number, key: [v4401.AssetId, v4401.AssetId]): AsyncIterable<[v4401.AssetId, v4401.AssetId][]>
    getPairs(): Promise<[k: [v4401.AssetId, v4401.AssetId], v: (v4401.AssetId | undefined)][]>
    getPairs(key: [v4401.AssetId, v4401.AssetId]): Promise<[k: [v4401.AssetId, v4401.AssetId], v: (v4401.AssetId | undefined)][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v4401.AssetId, v4401.AssetId], v: (v4401.AssetId | undefined)][]>
    getPairsPaged(pageSize: number, key: [v4401.AssetId, v4401.AssetId]): AsyncIterable<[k: [v4401.AssetId, v4401.AssetId], v: (v4401.AssetId | undefined)][]>
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
    get isV4401(): boolean {
        return this.getTypeHash() === 'bad89eddde62d5d40bc938d63d2495e173228abf7011695d72c252612979bde7'
    }

    /**
     *  (T::AssetId, T::AssetId) -> PairStatus
     */
    get asV4401(): ZenlinkProtocolPairStatusesStorageV4401 {
        assert(this.isV4401)
        return this as any
    }
}

/**
 *  (T::AssetId, T::AssetId) -> PairStatus
 */
export interface ZenlinkProtocolPairStatusesStorageV4401 {
    get(key: [v4401.AssetId, v4401.AssetId]): Promise<v4401.PairStatus>
    getAll(): Promise<v4401.PairStatus[]>
    getMany(keys: [v4401.AssetId, v4401.AssetId][]): Promise<v4401.PairStatus[]>
    getKeys(): Promise<[v4401.AssetId, v4401.AssetId][]>
    getKeys(key: [v4401.AssetId, v4401.AssetId]): Promise<[v4401.AssetId, v4401.AssetId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v4401.AssetId, v4401.AssetId][]>
    getKeysPaged(pageSize: number, key: [v4401.AssetId, v4401.AssetId]): AsyncIterable<[v4401.AssetId, v4401.AssetId][]>
    getPairs(): Promise<[k: [v4401.AssetId, v4401.AssetId], v: v4401.PairStatus][]>
    getPairs(key: [v4401.AssetId, v4401.AssetId]): Promise<[k: [v4401.AssetId, v4401.AssetId], v: v4401.PairStatus][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v4401.AssetId, v4401.AssetId], v: v4401.PairStatus][]>
    getPairsPaged(pageSize: number, key: [v4401.AssetId, v4401.AssetId]): AsyncIterable<[k: [v4401.AssetId, v4401.AssetId], v: v4401.PairStatus][]>
}
