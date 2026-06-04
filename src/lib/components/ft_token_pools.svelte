<script lang="ts">
	import { token_pools_fun } from "$lib/ts/token_pools_fun";
	import { full_token_info_fun } from "$lib/ts/full_token_info_fun";
	import type { FULL_TOKEN_INFO_RESPONSE } from "$lib/ts/full_token_info_fun";
	import type { RHEA_POOL } from "$lib/ts/token_pools_fun";
	// ============================================
	interface PROPS {
		token: string;
		tokenInfo: FULL_TOKEN_INFO_RESPONSE | null;
	}
	// ============================================
	interface PAIRED_TOKEN_INFO {
		price_usd: string;
		decimals: number;
	}
	// ============================================
	interface POOL_WITH_VALUE {
		pool: RHEA_POOL;
		pair_token: string;
		pair_info: PAIRED_TOKEN_INFO | null;
		token_amount: string;
		pair_amount: string;
		token_value_usd: number;
		pair_value_usd: number;
		total_lp_value_usd: number;
		token_percentage: number;
	}
	// ============================================
	let { token, tokenInfo }: PROPS = $props();
	let POOLS_LOADING_LET = $state(true);
	let POOLS_ERROR_LET = $state<string | null>(null);
	let POOLS_DATA_LET = $state<POOL_WITH_VALUE[] | null>(null);
	// ============================================
	$effect(() => {
		if (!token || !tokenInfo) {
			POOLS_LOADING_LET = false;
			POOLS_DATA_LET = null;
			return;
		}
		POOLS_LOADING_LET = true;
		POOLS_ERROR_LET = null;
		(async () => {
			try {
				const pools_result = await token_pools_fun(token);
				const pools_with_value: POOL_WITH_VALUE[] = [];
				for (const pool of pools_result.pools) {
					const pair_token = pool.tokenIds.find((t) => t !== token) ?? "";
					let pair_info: PAIRED_TOKEN_INFO | null = null;
					try {
						const info = await full_token_info_fun(pair_token);
						pair_info = {
							price_usd: info.price_usd,
							decimals: info.metadata.decimals
						};
					} catch {
						pair_info = { price_usd: "0", decimals: 24 };
					}
					const token_supply_amount = pool.supplies[token] ?? "0";
					const pair_supply_amount = pool.supplies[pair_token] ?? "0";
					const token_decimals = tokenInfo.metadata.decimals;
					const token_amount_val =
						parseFloat(token_supply_amount) / Math.pow(10, token_decimals);
					const pair_decimals = pair_info.decimals;
					const pair_amount_val =
						parseFloat(pair_supply_amount) / Math.pow(10, pair_decimals);
					const token_price = parseFloat(tokenInfo.price_usd);
					const pair_price = parseFloat(pair_info.price_usd);
					const token_value_usd = token_amount_val * token_price;
					const pair_value_usd = pair_amount_val * pair_price;
					const total_lp_value_usd = token_value_usd + pair_value_usd;
					const total_supply = parseFloat(tokenInfo.total_supply) / Math.pow(10, token_decimals);
					const token_percentage = total_supply > 0 ? (token_amount_val / total_supply) * 100 : 0;
					pools_with_value.push({
						pool,
						pair_token,
						pair_info,
						token_amount: token_supply_amount,
						pair_amount: pair_supply_amount,
						token_value_usd,
						pair_value_usd,
						total_lp_value_usd,
						token_percentage
					});
				}
				pools_with_value.sort((a, b) => b.total_lp_value_usd - a.total_lp_value_usd);
				POOLS_DATA_LET = pools_with_value;
			} catch (e) {
				POOLS_ERROR_LET = e instanceof Error ? e.message : "Failed to fetch pools";
			} finally {
				POOLS_LOADING_LET = false;
			}
		})();
	});
	// ============================================
	function format_fee(fee: number): string {
		return (fee / 100).toFixed(1) + "%";
	}
	// ============================================
	function format_value(value: number): string {
		if (value >= 1_000_000_000) return "$" + (value / 1_000_000_000).toFixed(2) + "B";
		if (value >= 1_000_000) return "$" + (value / 1_000_000).toFixed(2) + "M";
		if (value >= 1_000) return "$" + (value / 1_000).toFixed(2) + "K";
		if (value >= 1) return "$" + value.toFixed(2);
		return "$" + value.toFixed(4);
	}
	// ============================================
	function format_amount(amount: string, decimals: number): string {
		const value = parseFloat(amount) / Math.pow(10, decimals);
		if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(2) + "B";
		if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + "M";
		if (value >= 1_000) return (value / 1_000).toFixed(2) + "K";
		return value.toFixed(2);
	}
	// ============================================
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<div class="pools-container">
	{#if POOLS_LOADING_LET}
		<p class="loading">💩💩💩</p>
	{:else if POOLS_ERROR_LET}
		<p class="error">Error: {POOLS_ERROR_LET}</p>
	{:else if POOLS_DATA_LET && POOLS_DATA_LET.length > 0}
		<h1 class="pools-title">Pools ({POOLS_DATA_LET.length})</h1>
		<div class="pools-grid">
			{#each POOLS_DATA_LET as item}
				<div class="pool-card">
					<div class="pool-id">Pool #{item.pool.id}</div>
					<div class="pool-header">
						<div class="pool-pair">
							<span class="token-main" title={token}>{token}</span>
							<span class="arrow"> ↔ </span>
							<span class="token-pair" title={item.pair_token}>{item.pair_token}</span>
						</div>
						<span class="pool-fee">{format_fee(item.pool.fee)}</span>
					</div>
					<div class="pool-body">
						<div class="pool-stat">
							<span class="stat-label">Total LP Value</span>
							<span class="stat-value highlight">{format_value(item.total_lp_value_usd)}</span>
						</div>
						<div class="pool-tokens">
							<div class="token-row">
								<span class="token-label" title={token}>{token.split(".")[0]}</span>
								<span class="token-amt">{format_amount(item.token_amount, tokenInfo?.metadata.decimals ?? 24)}</span>
								<span class="token-val">{format_value(item.token_value_usd)}</span>
							</div>
							<div class="token-row">
								<span class="token-label" title={item.pair_token}>{item.pair_token.split(".")[0]}</span>
								<span class="token-amt">{format_amount(item.pair_amount, item.pair_info?.decimals ?? 24)}</span>
								<span class="token-val">{format_value(item.pair_value_usd)}</span>
							</div>
						</div>
						<div class="pool-stat">
							<span class="stat-label">% of {token.split(".")[0]} Supply</span>
							<span class="stat-value">{item.token_percentage.toFixed(4)}%</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="loading">No pools found</p>
	{/if}
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style>
	.pools-container {
		margin-top: 10px;
		width: 500px;
		max-width: 90vw;
		box-sizing: border-box;
		display: inline-block;
		text-align: left;
	}

	.pools-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 16px 0;
		color: #333;
	}

	.pools-grid {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.pool-card {
		border: 1px solid #e0e0e0;
		border-radius: 3px;
		padding: 16px;
		background: #fff;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
	}

	.pool-id {
		font-size: 0.7rem;
		color: #999;
		margin-bottom: 8px;
	}

	.pool-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
		padding-bottom: 8px;
		border-bottom: 1px solid #f0f0f0;
	}

	.pool-pair {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 4px;
		flex: 1;
		min-width: 0;
	}

	.token-main {
		font-weight: 600;
		font-size: 0.85rem;
		color: #333;
	}

	.arrow {
		color: #999;
		font-size: 0.8rem;
	}

	.token-pair {
		font-weight: 500;
		font-size: 0.85rem;
		color: #666;
		word-break: break-all;
	}

	.pool-fee {
		font-size: 0.75rem;
		color: #666;
		background: #f5f5f5;
		padding: 2px 6px;
		border-radius: 3px;
		white-space: nowrap;
	}

	.pool-body {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.pool-stat {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.stat-label {
		font-size: 0.8rem;
		color: #666;
	}

	.stat-value {
		font-size: 0.85rem;
		font-weight: 500;
		color: #333;
		font-variant-numeric: tabular-nums;
	}

	.stat-value.highlight {
		font-weight: 700;
		color: #2e7d32;
	}

	.pool-tokens {
		background: #fafafa;
		border-radius: 4px;
		padding: 8px 10px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.token-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.token-label {
		font-size: 0.75rem;
		color: #666;
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-right: 8px;
	}

	.token-amt {
		font-size: 0.8rem;
		font-weight: 500;
		color: #333;
		font-variant-numeric: tabular-nums;
		text-align: right;
		margin-right: 12px;
	}

	.token-val {
		font-size: 0.8rem;
		color: #666;
		font-variant-numeric: tabular-nums;
		text-align: right;
		min-width: 70px;
	}

	.loading,
	.error {
		text-align: center;
		padding: 20px;
		color: #666;
	}

	.error {
		color: #d32f2f;
	}
</style>