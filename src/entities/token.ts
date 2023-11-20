import { TOKEN_METADATA_MAP, ZERO_BD } from "../constants";
import { Token } from "../model";
import { EventHandlerContext } from "../types";
import { AssetManagerAssetIdMetadataStorage } from "../types/storage";
import { AssetId } from "../types/v4401";
import {
  addressFromAsset,
  getTotalIssuance,
  u8a2s,
} from "../utils/token";

export async function getOrCreateToken(
  ctx: EventHandlerContext,
  asset: AssetId
): Promise<Token | undefined> {
  const address = addressFromAsset(asset);
  let token = await ctx.store.get(Token, address);

  if (!token) {
    const metadataStorage = new AssetManagerAssetIdMetadataStorage(
      ctx,
      ctx.block
    );
    let metaddata;

    if (!metadataStorage.isExists) {
      metaddata = TOKEN_METADATA_MAP[address];
    } else {
      const currencyId = asset;
      const result = metadataStorage.isV4401
        ? await metadataStorage.asV4401.get(currencyId.assetIndex)
        : undefined;

      if (result) {
        metaddata = {
          symbol: u8a2s(result.metadata.symbol),
          name: u8a2s(result.metadata.name),
          decimals: result.metadata.decimals,
        };
      }
      if (!metaddata) {
        metaddata = TOKEN_METADATA_MAP[address];
      }
    }

    if (!metaddata) return undefined;
    const { name, symbol, decimals } = metaddata;
    const totalSupply = await getTotalIssuance(
      ctx,
      asset
    );
    token = new Token({
      id: address.toLowerCase(),
      name,
      symbol,
      totalSupply: totalSupply?.toString() ?? "0",
      decimals,
      derivedETH: ZERO_BD.toString(),
      tradeVolume: ZERO_BD.toString(),
      tradeVolumeUSD: ZERO_BD.toString(),
      untrackedVolumeUSD: ZERO_BD.toString(),
      totalLiquidity: ZERO_BD.toString(),
      txCount: 0,
    });

    await ctx.store.save(token);
  }

  return token;
}
