import type {Result, Option} from './support'

export interface AssetAccount {
    balance: bigint
    status: AccountStatus
    reason: ExistenceReason
}

export interface AccountInfo {
    nonce: number
    consumers: number
    providers: number
    sufficients: number
    data: AccountData
}

export type AccountStatus = AccountStatus_Liquid | AccountStatus_Frozen | AccountStatus_Blocked

export interface AccountStatus_Liquid {
    __kind: 'Liquid'
}

export interface AccountStatus_Frozen {
    __kind: 'Frozen'
}

export interface AccountStatus_Blocked {
    __kind: 'Blocked'
}

export type ExistenceReason = ExistenceReason_Consumer | ExistenceReason_Sufficient | ExistenceReason_DepositHeld | ExistenceReason_DepositRefunded | ExistenceReason_DepositFrom

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

export interface ExistenceReason_DepositFrom {
    __kind: 'DepositFrom'
    value: [Uint8Array, bigint]
}

export interface AccountData {
    free: bigint
    reserved: bigint
    frozen: bigint
    flags: bigint
}
