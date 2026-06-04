import { token_pools_fun } from "../src/lib/ts/token_pools_fun";
// ============================================
const token_ca = "shit-1170.meme-cooking.near";
// ============================================
const result = await token_pools_fun(token_ca);
console.log(`Found ${result.pools.length} pools for ${result.token_ca}:\n`);
for (const pool of result.pools) {
	console.log(`Pool #${pool.id} (${pool.pool_kind}): ${pool.tokenIds.join(" <-> ")}`);
}