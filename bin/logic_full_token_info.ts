import { full_token_info_fun } from "../src/lib/ts/full_token_info_fun";
// ============================================
const token_ca = "intel.tkn.near";
// ============================================
const price = await full_token_info_fun(token_ca);
// ============================================
console.log("Account ID:", price.account_id);
console.log("Price USD:", price.price_usd);
console.log("Metadata:", price.metadata);
console.log("Total Supply:", price.total_supply);
console.log("Circulating Supply:", price.circulating_supply);
console.log("Liquidity USD:", price.liquidity_usd);
console.log("Volume 24h:", price.volume_usd_24h);