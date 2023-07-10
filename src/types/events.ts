import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'
import * as v4201 from './v4201'

export class AssetsBurnedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Assets.Burned')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some assets were destroyed.
     */
    get isV4201(): boolean {
        return this._chain.getEventHash('Assets.Burned') === 'da3db639d32fd55061bbd29c64e3da172dcb9737fad0afab14af907858ad6104'
    }

    /**
     * Some assets were destroyed.
     */
    get asV4201(): {assetId: bigint, owner: Uint8Array, balance: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class AssetsIssuedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Assets.Issued')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some assets were issued.
     */
    get isV4201(): boolean {
        return this._chain.getEventHash('Assets.Issued') === 'bbe668e403e65626eea48730a19d2c3fc2aa0021b0c91fb0fad638a3f088fd70'
    }

    /**
     * Some assets were issued.
     */
    get asV4201(): {assetId: bigint, owner: Uint8Array, totalSupply: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class AssetsTransferredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Assets.Transferred')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some assets were transferred.
     */
    get isV4201(): boolean {
        return this._chain.getEventHash('Assets.Transferred') === '1de11d8e4843f792b2761307d7fe8bdee39bd4a7b38fefe28de5d4a5e3346188'
    }

    /**
     * Some assets were transferred.
     */
    get asV4201(): {assetId: bigint, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingAllForceGaugeClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.AllForceGaugeClaimed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.AllForceGaugeClaimed') === '4ed6045a038fa7a458a503047b3dee05af96162d5ff5a6c7793d85673ce1af98'
    }

    get asV4201(): {gid: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingAllRetiredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.AllRetired')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.AllRetired') === '615c4243f0db31b3a30a1feaa535522b5b145668f87eceed12ca60ae6f312fd5'
    }

    get asV4201(): {pid: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingChargedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.Charged')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.Charged') === 'b0374fe723a4accf7c6fe8f6fe899d2c50e12fd5061801982bafafe4be044609'
    }

    get asV4201(): {who: Uint8Array, pid: bigint, rewards: [bigint, bigint][]} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.Claimed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.Claimed') === 'b4097244d64ad953b6129db2a6132c5904322eca449724bac8e604da42aa8bf8'
    }

    get asV4201(): {who: Uint8Array, pid: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingDepositedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.Deposited')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.Deposited') === '8c20cc963649b86f3d20e0ee3c5a25112b398bfc7515250cdb1b388eedbbd062'
    }

    get asV4201(): {who: Uint8Array, pid: bigint, addValue: bigint, gaugeInfo: ([bigint, number] | undefined)} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolClosedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolClosed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolClosed') === '615c4243f0db31b3a30a1feaa535522b5b145668f87eceed12ca60ae6f312fd5'
    }

    get asV4201(): {pid: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolCreated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolCreated') === '615c4243f0db31b3a30a1feaa535522b5b145668f87eceed12ca60ae6f312fd5'
    }

    get asV4201(): {pid: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolEditedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolEdited')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolEdited') === '615c4243f0db31b3a30a1feaa535522b5b145668f87eceed12ca60ae6f312fd5'
    }

    get asV4201(): {pid: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolKilledEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolKilled')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolKilled') === '615c4243f0db31b3a30a1feaa535522b5b145668f87eceed12ca60ae6f312fd5'
    }

    get asV4201(): {pid: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolResetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolReset')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolReset') === '615c4243f0db31b3a30a1feaa535522b5b145668f87eceed12ca60ae6f312fd5'
    }

    get asV4201(): {pid: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingGaugeWithdrawnEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.GaugeWithdrawn')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.GaugeWithdrawn') === '56da6a506a1a798635bb9140197ee5ed7bfd8435565de1fed300aedca6305983'
    }

    get asV4201(): {who: Uint8Array, gid: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingPartiallyForceGaugeClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.PartiallyForceGaugeClaimed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.PartiallyForceGaugeClaimed') === '4ed6045a038fa7a458a503047b3dee05af96162d5ff5a6c7793d85673ce1af98'
    }

    get asV4201(): {gid: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingPartiallyRetiredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.PartiallyRetired')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.PartiallyRetired') === '615c4243f0db31b3a30a1feaa535522b5b145668f87eceed12ca60ae6f312fd5'
    }

    get asV4201(): {pid: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingRetireLimitSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.RetireLimitSet')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.RetireLimitSet') === 'f707ff742083978d0b1f391a9771c28219f5e35ce5ba83507482cd04e92d916b'
    }

    get asV4201(): {limit: number} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingWithdrawClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.WithdrawClaimed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.WithdrawClaimed') === 'b4097244d64ad953b6129db2a6132c5904322eca449724bac8e604da42aa8bf8'
    }

    get asV4201(): {who: Uint8Array, pid: bigint} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingWithdrawnEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.Withdrawn')
        this._chain = ctx._chain
        this.event = event
    }

    get isV4201(): boolean {
        return this._chain.getEventHash('Farming.Withdrawn') === 'b16970dbd48a76b60ebb4e891c476c00b0b705a4ea1eec573e3c77a5301e9a5d'
    }

    get asV4201(): {who: Uint8Array, pid: bigint, removeValue: (bigint | undefined)} {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class ZenlinkProtocolAssetSwapEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ZenlinkProtocol.AssetSwap')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get isV4201(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.AssetSwap') === 'e9cbb9bf25ce7ca78f66cb163c5de7b5b796a1f9f5cf2f1d1955496bd76f264e'
    }

    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get asV4201(): [Uint8Array, Uint8Array, v4201.AssetId[], bigint[]] {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class ZenlinkProtocolLiquidityAddedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ZenlinkProtocol.LiquidityAdded')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    get isV4201(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityAdded') === '1bfafadda80f84623e855502fa86cbd5fb805fa26a6254ee45104d1d976c2219'
    }

    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    get asV4201(): [Uint8Array, v4201.AssetId, v4201.AssetId, bigint, bigint, bigint] {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}

export class ZenlinkProtocolLiquidityRemovedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ZenlinkProtocol.LiquidityRemoved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get isV4201(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityRemoved') === '9decbbc0fd030ae8322c18bf256e4f3ace487600f6cf3b11b8961ab923a40bf1'
    }

    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get asV4201(): [Uint8Array, Uint8Array, v4201.AssetId, v4201.AssetId, bigint, bigint, bigint] {
        assert(this.isV4201)
        return this._chain.decodeEvent(this.event)
    }
}
