<script lang="ts">
	import { top_holders_fun } from "$lib/ts/top_holders_fun";
	import type { FULL_TOKEN_INFO_RESPONSE } from "$lib/ts/full_token_info_fun";
	import type { TOP_HOLDERS_RESPONSE } from "$lib/ts/top_holders_fun";
	// ============================================
	interface PROPS {
		token: string;
		tokenInfo: FULL_TOKEN_INFO_RESPONSE | null;
	}
	// ============================================
	let { token, tokenInfo }: PROPS = $props();
	let info: TOP_HOLDERS_RESPONSE | null = $state(null);
	let loading = $state(true);
	let error = $state<string | null>(null);
	// ============================================
	$effect(() => {
		if (!token) {
			loading = false;
			info = null;
			return;
		}
		loading = true;
		error = null;
		(async () => {
			try {
				info = await top_holders_fun(token);
				console.log("======= top 100 holders =======");
				console.log($state.snapshot(info));
			} catch (e) {
				error = e instanceof Error ? e.message : "Failed to fetch top holders";
			} finally {
				loading = false;
			}
		})();
	});
	// ============================================
	function format_balance(balance: string, decimals: number): string {
		const value = parseFloat(balance) / Math.pow(10, decimals);
		if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(2) + "B";
		if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + "M";
		if (value >= 1_000) return (value / 1_000).toFixed(2) + "K";
		return value.toFixed(2);
	}
	// ============================================
	function get_usd_value(balance: string, decimals: number, price_usd: string): string {
		const value = parseFloat(balance) / Math.pow(10, decimals);
		const usd = value * parseFloat(price_usd);
		if (usd >= 1_000_000_000) return "$" + (usd / 1_000_000_000).toFixed(2) + "B";
		if (usd >= 1_000_000) return "$" + (usd / 1_000_000).toFixed(2) + "M";
		if (usd >= 1_000) return "$" + (usd / 1_000).toFixed(2) + "K";
		if (usd >= 1) return "$" + usd.toFixed(2);
		return "$" + usd.toFixed(4);
	}
	// ============================================
	function get_percentage(balance: string, decimals: number, total_supply: string): string {
		const holder = parseFloat(balance) / Math.pow(10, decimals);
		const total = parseFloat(total_supply) / Math.pow(10, decimals);
		return ((holder / total) * 100).toFixed(2) + "%";
	}
	// ============================================
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<div class="th-card">
	{#if loading}
		<p class="loading">💩💩💩</p>
	{:else if error}
		<p class="error">Error: {error}</p>
	{:else if info && tokenInfo}
		<h1 class="th-title">Top {info.accounts.length} Holders</h1>
		<div class="th-header-row">
			<span class="th-col-account">ACCOUNT</span>
			<span class="th-col-balance">BALANCE</span>
		</div>
		<ul class="th-list">
			{#each info.accounts as holder}
				<li class="th-item">
					<span class="th-account" title={holder.account_id}>{holder.account_id}</span>
					<span class="th-balance">
						{format_balance(holder.balance, tokenInfo.metadata.decimals)}&nbsp;({get_usd_value(
							holder.balance,
							tokenInfo.metadata.decimals,
							tokenInfo.price_usd
						)})&nbsp;{get_percentage(
							holder.balance,
							tokenInfo.metadata.decimals,
							tokenInfo.total_supply
						)}
					</span>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="loading">Loading holders...</p>
	{/if}
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style>
	.th-card {
		margin-top: 10px;
		border: 1px solid #e0e0e0;
		border-radius: 3px;
		padding: 24px;
		width: 500px;
		max-width: 90vw;
		box-sizing: border-box;
		display: inline-block;
		text-align: left;
		background: #fff;
		color: #333;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
	}

	.th-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 16px 0;
	}

	.th-header-row {
		display: flex;
		justify-content: space-between;
		padding: 8px 0;
		border-bottom: 2px solid #e0e0e0;
		font-weight: 600;
		font-size: 0.8rem;
		color: #666;
		text-transform: uppercase;
	}

	.th-col-account {
		flex: 1;
	}

	.th-col-balance {
		text-align: right;
	}

	.th-list {
		list-style: none;
		padding: 0;
		margin: 0;
		max-height: 400px;
		overflow-y: auto;
	}

	.th-item {
		display: flex;
		justify-content: space-between;
		padding: 8px 0;
		border-bottom: 1px solid #f0f0f0;
		font-size: 0.85rem;
	}

	.th-account {
		word-break: break-all;
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-right: 12px;
	}

	.th-balance {
		white-space: nowrap;
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	.loading,
	.error {
		text-align: center;
		padding: 20px;
	}

	.error {
		color: #d32f2f;
	}
</style>
