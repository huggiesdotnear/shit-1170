// Prices and LP Pool Data
// https://prices.intear.tech/price?token_id=
// just returns a raw string example: 6.351883758720653e-7

import { POOLS, TOKENS, TOKEN_DECIMALS } from "./shit_config";

export interface PoolData {
  pool_kind: string;
  token_account_ids: string[];
  amounts: string[];
  total_fee: number;
  shares_total_supply: string;
  amp: number;
}

export interface TokenPrice {
  token_id: string;
  price_usd: number;
}

export interface PoolInfo {
  pool_id: number;
  pair_name: string;
  token0: string;
  token1: string;
  token0_amount: string;
  token1_amount: string;
  token0_amount_human: number;
  token1_amount_human: number;
  token0_usd_value: number;
  token1_usd_value: number;
  token0_symbol: string;
  token1_symbol: string;
  tvl_usd: number;
  shit_price_usd: number;
}

// Get token symbol from token ID
const getTokenSymbol = (tokenId: string): string => {
  const tokenMap: Record<string, string> = {
    [TOKENS.SHIT]: "SHIT",
    [TOKENS.WNEAR]: "wNEAR",
    [TOKENS.STNEAR]: "stNEAR",
    [TOKENS.JAMBO]: "JAMBO",
    [TOKENS.PUMP]: "PUMP",
    [TOKENS.CRANS]: "CRANS",
    [TOKENS.XPOST]: "XPOST",
    [TOKENS.VOTE]: "VOTE",
    [TOKENS.N1813]: "N1813",
  };
  return tokenMap[tokenId] || tokenId.split(".")[0].toUpperCase();
};

// Fetch token price from intear.tech
const fetchTokenPrice = async (tokenId: string): Promise<number> => {
  try {
    console.log(`💰 Fetching price for ${tokenId}`);
    const response = await fetch(
      `https://prices.intear.tech/price?token_id=${tokenId}`,
      {
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const priceStr = await response.text();
    const price = parseFloat(priceStr);
    console.log(`💰 ${tokenId} price: $${price}`);
    return price;
  } catch (error) {
    console.error(`❌ Error fetching price for ${tokenId}:`, error);
    return 0;
  }
};

// Fetch pool data from Ref Finance using fastintear
const fetchPoolData = async (poolId: number): Promise<PoolData | null> => {
  try {
    console.log(`🏊 Fetching pool data for pool ${poolId}`);

    // Use fastintear's near.view() method
    const result = await (window as any).near.view({
      contractId: "v2.ref-finance.near",
      methodName: "get_pool",
      args: { pool_id: poolId },
    });

    console.log(`🏊 Pool ${poolId} data:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Error fetching pool ${poolId}:`, error);
    return null;
  }
};

// Calculate SHIT price from pool data
const calculateShitPrice = (
  poolData: PoolData,
  otherTokenPrice: number,
): number => {
  const shitIndex = poolData.token_account_ids.findIndex(
    (id) => id === TOKENS.SHIT,
  );
  if (shitIndex === -1) return 0;

  const otherIndex = shitIndex === 0 ? 1 : 0;
  const shitAmount = BigInt(poolData.amounts[shitIndex]);
  const otherAmount = BigInt(poolData.amounts[otherIndex]);

  const shitDecimals = TOKEN_DECIMALS[TOKENS.SHIT];
  const otherTokenId = poolData.token_account_ids[otherIndex];
  const otherDecimals =
    TOKEN_DECIMALS[otherTokenId as keyof typeof TOKEN_DECIMALS] || 24;

  // Convert to human readable amounts
  const shitHuman = Number(shitAmount) / Math.pow(10, shitDecimals);
  const otherHuman = Number(otherAmount) / Math.pow(10, otherDecimals);

  // Calculate SHIT price: (other_amount * other_price) / shit_amount
  const shitPrice = (otherHuman * otherTokenPrice) / shitHuman;

  console.log(`💎 SHIT price calculation:`, {
    shitAmount: shitHuman,
    otherAmount: otherHuman,
    otherPrice: otherTokenPrice,
    shitPrice,
  });

  return shitPrice;
};

// Fetch SHIT price from intear.tech
export const fetchShitPrice = async (): Promise<number> => {
  return await fetchTokenPrice(TOKENS.SHIT);
};

// Fetch all pool information
export const fetchAllPoolsInfo = async (): Promise<PoolInfo[]> => {
  console.log("🚀 Fetching all pools info...");

  const poolsInfo: PoolInfo[] = [];

  // Get base token prices first
  const nearPrice = await fetchTokenPrice(TOKENS.WNEAR);
  const stNearPrice = await fetchTokenPrice(TOKENS.STNEAR);
  const jamboPrice = await fetchTokenPrice(TOKENS.JAMBO);
  const pumpPrice = await fetchTokenPrice(TOKENS.PUMP);
  const cransPrice = await fetchTokenPrice(TOKENS.CRANS);
  const xpostPrice = await fetchTokenPrice(TOKENS.XPOST);
  const votePrice = await fetchTokenPrice(TOKENS.VOTE);
  const n1813Price = await fetchTokenPrice(TOKENS.N1813);

  const priceMap: Record<string, number> = {
    [TOKENS.WNEAR]: nearPrice,
    [TOKENS.STNEAR]: stNearPrice,
    [TOKENS.JAMBO]: jamboPrice,
    [TOKENS.PUMP]: pumpPrice,
    [TOKENS.CRANS]: cransPrice,
    [TOKENS.XPOST]: xpostPrice,
    [TOKENS.VOTE]: votePrice,
    [TOKENS.N1813]: n1813Price,
    [TOKENS.SHIT]: 0, // Will be calculated from pools
  };

  // Process each pool
  for (const [pairName, poolId] of Object.entries(POOLS)) {
    const poolData = await fetchPoolData(poolId);
    if (!poolData) continue;

    const token0Id = poolData.token_account_ids[0];
    const token1Id = poolData.token_account_ids[1];
    const token0Symbol = getTokenSymbol(token0Id);
    const token1Symbol = getTokenSymbol(token1Id);

    // Get prices for both tokens
    const token0Price = priceMap[token0Id] || 0;
    const token1Price = priceMap[token1Id] || 0;

    // Calculate SHIT price from this pool
    const otherTokenId = token0Id === TOKENS.SHIT ? token1Id : token0Id;
    const otherTokenPrice = priceMap[otherTokenId] || 0;
    const shitPrice = calculateShitPrice(poolData, otherTokenPrice);

    // Calculate human readable amounts
    const decimals0 =
      TOKEN_DECIMALS[token0Id as keyof typeof TOKEN_DECIMALS] || 24;
    const decimals1 =
      TOKEN_DECIMALS[token1Id as keyof typeof TOKEN_DECIMALS] || 24;
    const token0AmountHuman =
      Number(poolData.amounts[0]) / Math.pow(10, decimals0);
    const token1AmountHuman =
      Number(poolData.amounts[1]) / Math.pow(10, decimals1);

    // Calculate USD values for each token
    const token0UsdValue = token0AmountHuman * (token0Price || shitPrice);
    const token1UsdValue = token1AmountHuman * (token1Price || shitPrice);

    // Calculate TVL
    const tvl = token0UsdValue + token1UsdValue;

    poolsInfo.push({
      pool_id: poolId,
      pair_name: pairName,
      token0: token0Id,
      token1: token1Id,
      token0_amount: poolData.amounts[0],
      token1_amount: poolData.amounts[1],
      token0_amount_human: token0AmountHuman,
      token1_amount_human: token1AmountHuman,
      token0_usd_value: token0UsdValue,
      token1_usd_value: token1UsdValue,
      token0_symbol: token0Symbol,
      token1_symbol: token1Symbol,
      tvl_usd: tvl,
      shit_price_usd: shitPrice,
    });
  }

  console.log("✅ All pools info fetched:", poolsInfo);
  return poolsInfo;
};
