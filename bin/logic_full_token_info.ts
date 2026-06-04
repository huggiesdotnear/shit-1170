import { full_token_info_fun } from "../src/lib/ts/full_token_info_fun";
import { format_price_usd } from "../src/lib/ts/format_price_usd";
// ============================================
const token_cas = ["intel.tkn.near", "blackdragon.tkn.near", "shit-1170.meme-cooking.near"];
// ============================================
for (const token_ca of token_cas) {
	console.log(`\n===== ${token_ca} =====`);
	const full_token_info = await full_token_info_fun(token_ca);
	console.log("Account ID:", full_token_info.account_id);
	console.log("Price USD:", format_price_usd(full_token_info.price_usd));
	console.log("Metadata:", full_token_info.metadata);
	console.log("Total Supply:", full_token_info.total_supply);
	console.log("Circulating Supply:", full_token_info.circulating_supply);
	console.log("Liquidity USD:", full_token_info.liquidity_usd);
	console.log("Volume 24h:", full_token_info.volume_usd_24h);
}
