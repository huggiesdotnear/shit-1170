// Prices and LP Pool Data
// https://prices.intear.tech/price?token_id=
// just returns a raw string example: 6.351883758720653e-7

import { POOLS, TOKENS, TOKEN_DECIMALS } from './shit_config';

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
    token0_symbol: string;
    token1_symbol: string;
    tvl_usd: number;
    shit_price_usd: number;
}

// Get token symbol from token ID
const getTokenSymbol = (tokenId: string): string => {
    const tokenMap: Record<string, string> = {
        [TOKENS.SHIT]: 'SHIT',
        [TOKENS.WNEAR]: 'wNEAR',
        [TOKENS.STNEAR]: 'stNEAR',
        [TOKENS.JAMBO]: 'JAMBO',
        [TOKENS.PUMP]: 'PUMP'
    };
    return tokenMap[tokenId] || tokenId.split('.')[0].toUpperCase();
};

// Fetch token price from intear.tech
const fetchTokenPrice = async (tokenId: string): Promise<number> => {
    try {
        console.log(`💰 Fetching price for ${tokenId}`);
        const response = await fetch(`https://prices.intear.tech/price?token_id=${tokenId}`);
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

// Fetch pool data from Ref Finance
const fetchPoolData = async (poolId: number): Promise<PoolData | null> => {
    try {
        console.log(`🏊 Fetching pool data for pool ${poolId}`);

        // This would normally use NEAR RPC, but for now we'll simulate
        // In a real implementation, you'd use near.view() here
        const response = await fetch('https://rpc.mainnet.near.org', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'dontcare',
                method: 'query',
                params: {
                    request_type: 'call_function',
                    finality: 'final',
                    account_id: 'v2.ref-finance.near',
                    method_name: 'get_pool',
                    args_base64: btoa(JSON.stringify({ pool_id: poolId }))
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }

        const result = JSON.parse(new TextDecoder().decode(new Uint8Array(data.result.result)));
        console.log(`🏊 Pool ${poolId} data:`, result);
        return result;
    } catch (error) {
        console.error(`❌ Error fetching pool ${poolId}:`, error);
        return null;
    }
};

// Calculate SHIT price from pool data
const calculateShitPrice = (poolData: PoolData, otherTokenPrice: number): number => {
    const shitIndex = poolData.token_account_ids.findIndex(id => id === TOKENS.SHIT);
    if (shitIndex === -1) return 0;

    const otherIndex = shitIndex === 0 ? 1 : 0;
    const shitAmount = BigInt(poolData.amounts[shitIndex]);
    const otherAmount = BigInt(poolData.amounts[otherIndex]);

    const shitDecimals = TOKEN_DECIMALS[TOKENS.SHIT];
    const otherTokenId = poolData.token_account_ids[otherIndex];
    const otherDecimals = TOKEN_DECIMALS[otherTokenId as keyof typeof TOKEN_DECIMALS] || 24;

    // Convert to human readable amounts
    const shitHuman = Number(shitAmount) / Math.pow(10, shitDecimals);
    const otherHuman = Number(otherAmount) / Math.pow(10, otherDecimals);

    // Calculate SHIT price: (other_amount * other_price) / shit_amount
    const shitPrice = (otherHuman * otherTokenPrice) / shitHuman;

    console.log(`💎 SHIT price calculation:`, {
        shitAmount: shitHuman,
        otherAmount: otherHuman,
        otherPrice: otherTokenPrice,
        shitPrice
    });

    return shitPrice;
};

// Calculate TVL for a pool
const calculateTVL = (poolData: PoolData, token0Price: number, token1Price: number): number => {
    const amount0 = BigInt(poolData.amounts[0]);
    const amount1 = BigInt(poolData.amounts[1]);

    const token0Id = poolData.token_account_ids[0];
    const token1Id = poolData.token_account_ids[1];

    const decimals0 = TOKEN_DECIMALS[token0Id as keyof typeof TOKEN_DECIMALS] || 24;
    const decimals1 = TOKEN_DECIMALS[token1Id as keyof typeof TOKEN_DECIMALS] || 24;

    const human0 = Number(amount0) / Math.pow(10, decimals0);
    const human1 = Number(amount1) / Math.pow(10, decimals1);

    const tvl = (human0 * token0Price) + (human1 * token1Price);

    console.log(`📊 TVL calculation:`, {
        token0: token0Id,
        token1: token1Id,
        amount0: human0,
        amount1: human1,
        price0: token0Price,
        price1: token1Price,
        tvl
    });

    return tvl;
};

// Fetch all pool information
export const fetchAllPoolsInfo = async (): Promise<PoolInfo[]> => {
    console.log('🚀 Fetching all pools info...');

    const poolsInfo: PoolInfo[] = [];

    // Get base token prices first
    const nearPrice = await fetchTokenPrice(TOKENS.WNEAR);
    const stNearPrice = await fetchTokenPrice(TOKENS.STNEAR);
    const jamboPrice = await fetchTokenPrice(TOKENS.JAMBO);
    const pumpPrice = await fetchTokenPrice(TOKENS.PUMP);

    const priceMap: Record<string, number> = {
        [TOKENS.WNEAR]: nearPrice,
        [TOKENS.STNEAR]: stNearPrice,
        [TOKENS.JAMBO]: jamboPrice,
        [TOKENS.PUMP]: pumpPrice,
        [TOKENS.SHIT]: 0 // Will be calculated from pools
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

        // Calculate TVL
        const tvl = calculateTVL(poolData, token0Price || shitPrice, token1Price || shitPrice);

        poolsInfo.push({
            pool_id: poolId,
            pair_name: pairName,
            token0: token0Id,
            token1: token1Id,
            token0_amount: poolData.amounts[0],
            token1_amount: poolData.amounts[1],
            token0_symbol: token0Symbol,
            token1_symbol: token1Symbol,
            tvl_usd: tvl,
            shit_price_usd: shitPrice
        });
    }

    console.log('✅ All pools info fetched:', poolsInfo);
    return poolsInfo;
};