import type {Result, Option} from './support'

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
    isFrozen: boolean
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
