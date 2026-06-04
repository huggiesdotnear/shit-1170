import { top_holders_fun } from "../src/lib/ts/top_holders_fun";
// ============================================
const token_ca = "shit-1170.meme-cooking.near";
// ============================================
const result = await top_holders_fun(token_ca);
console.log(`Total holders: ${result.total}`);
console.log(`Showing ${result.accounts.length} accounts:\n`);
for (const account of result.accounts) {
	console.log(`${account.account_id}: ${account.balance}`);
}
