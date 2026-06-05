// RHEA_POOLS_RESPONSE
export interface RHEA_POOL {
	id: number;
	tokenIds: string[];
	supplies: Record<string, string>;
	fee: number;
	shareSupply: string;
	pool_kind: string;
}
export interface RHEA_POOLS_RESPONSE {
	block_number: number;
	block_time: number;
	simplePools: RHEA_POOL[];
}
// ============================================
// TOKEN_POOLS (filtered result)
export interface TOKEN_POOLS {
	token_ca: string;
	pools: RHEA_POOL[];
}
// ============================================
export async function token_pools_fun(token_ca: string): Promise<TOKEN_POOLS> {
	const url = `https://api.rhea.finance/fetchAllPools`;
	const response = await fetch(url);
	const data: RHEA_POOLS_RESPONSE = await response.json();
	const pools = data.simplePools.filter((pool) => pool.tokenIds.includes(token_ca));
	return { token_ca, pools };
}
