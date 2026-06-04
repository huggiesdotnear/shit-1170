// FULL_TOKEN_INFO_FUN
// full_token_info_fun
// ============================================
// TOKEN_METADATA
export interface TOKEN_METADATA {
	name: string;
	symbol: string;
	decimals: number;
	reference: string | null;
	icon: string | null;
}
// ============================================
// FULL_TOKEN_INFO_RESPONSE
export interface FULL_TOKEN_INFO_RESPONSE {
	account_id: string;
	price_usd: string;
	price_usd_raw: string;
	metadata: TOKEN_METADATA;
	total_supply: string;
	circulating_supply: string;
	liquidity_usd: number;
	volume_usd_24h: number;
}
// ============================================
// full_token_info_fun
export async function full_token_info_fun(token_ca: string): Promise<FULL_TOKEN_INFO_RESPONSE> {
	const url = `https://prices.intear.tech/token?token_id=${token_ca}`;
	const response = await fetch(url);
	return response.json();
}
// ============================================
