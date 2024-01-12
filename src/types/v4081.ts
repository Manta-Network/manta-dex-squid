import type {Result, Option} from './support'

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
