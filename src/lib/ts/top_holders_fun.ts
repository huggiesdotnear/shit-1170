// TOP_HOLDERS_RESPONSE
export interface TOP_HOLDERS_RESPONSE {
	token_id: string;
	accounts: Array<{
		account_id: string;
		balance: string;
	}>;
}
// ============================================
export async function top_holders_fun(token_ca: string): Promise<TOP_HOLDERS_RESPONSE> {
	const url = `https://api.fastnear.com/v1/ft/${token_ca}/top?max_results=100`;
	const response = await fetch(url);
	return response.json();
}