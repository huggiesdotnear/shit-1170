<script lang="ts">
	import { top_holders_fun } from "$lib/ts/top_holders_fun";
	import { full_token_info_fun } from "$lib/ts/full_token_info_fun";
	import { HOLDER_EMOJI, KNOWN_ACCOUNTS } from "$lib/ts/known_accounts";
	import type { FULL_TOKEN_INFO_RESPONSE } from "$lib/ts/full_token_info_fun";
	import type { TOP_HOLDERS_RESPONSE } from "$lib/ts/top_holders_fun";
	// ============================================
	const TOKEN_CA = "shit-1170.meme-cooking.near";
	const DECIMALS = 18;
	const TOTAL_SUPPLY = "1000000000000000000000000000";
	// ============================================
	type HOLDER_TYPE = "dev" | "dex" | "vault" | "nft" | "burn" | "regular";
	const HOLDER_EMOJI_WITH_REGULAR = {
		...HOLDER_EMOJI,
		regular: "👤"
	};
	// ============================================
	let TOKEN_INFO_LET = $state<FULL_TOKEN_INFO_RESPONSE | null>(null);
	let HOLDERS_DATA_LET = $state<TOP_HOLDERS_RESPONSE | null>(null);
	let LOADING_LET = $state(true);
	let ERROR_LET = $state<string | null>(null);
	let ACTIVE_TAB_LET = $state<HOLDER_TYPE | "all">("all");
	// ============================================
	$effect(() => {
		(async () => {
			try {
				const [tokenInfo, holdersData] = await Promise.all([
					full_token_info_fun(TOKEN_CA),
					top_holders_fun(TOKEN_CA)
				]);
				TOKEN_INFO_LET = tokenInfo;
				HOLDERS_DATA_LET = holdersData;
			} catch (e) {
				ERROR_LET = e instanceof Error ? e.message : "Failed to fetch data";
			} finally {
				LOADING_LET = false;
			}
		})();
	});
	// ============================================
	function format_balance(balance: string): string {
		const value = parseFloat(balance) / Math.pow(10, DECIMALS);
		if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(2) + "B";
		if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + "M";
		if (value >= 1_000) return (value / 1_000).toFixed(2) + "K";
		return value.toFixed(2);
	}
	// ============================================
	function get_usd_value(balance: string, price_usd: string): string {
		const value = parseFloat(balance) / Math.pow(10, DECIMALS);
		const usd = value * parseFloat(price_usd);
		if (usd >= 1_000_000_000) return "$" + (usd / 1_000_000_000).toFixed(2) + "B";
		if (usd >= 1_000_000) return "$" + (usd / 1_000_000).toFixed(2) + "M";
		if (usd >= 1_000) return "$" + (usd / 1_000).toFixed(2) + "K";
		if (usd >= 1) return "$" + usd.toFixed(2);
		return "$" + usd.toFixed(4);
	}
	// ============================================
	function get_percentage(balance: string): string {
		const holder = parseFloat(balance) / Math.pow(10, DECIMALS);
		const total = parseFloat(TOTAL_SUPPLY) / Math.pow(10, DECIMALS);
		return ((holder / total) * 100).toFixed(2) + "%";
	}
	// ============================================
	function get_holder_type(account_id: string): HOLDER_TYPE {
		return (KNOWN_ACCOUNTS[account_id] as HOLDER_TYPE) || "regular";
	}
	// ============================================
	function get_filtered_holders() {
		if (!HOLDERS_DATA_LET) return [];
		if (ACTIVE_TAB_LET === "all") return HOLDERS_DATA_LET.accounts;
		return HOLDERS_DATA_LET.accounts.filter(
			(a) => get_holder_type(a.account_id) === ACTIVE_TAB_LET
		);
	}
	// ============================================
	function get_group_totals() {
		if (!HOLDERS_DATA_LET) return null;
		const groups: Record<HOLDER_TYPE, { balance: string; count: number }> = {
			dev: { balance: "0", count: 0 },
			dex: { balance: "0", count: 0 },
			vault: { balance: "0", count: 0 },
			nft: { balance: "0", count: 0 },
			burn: { balance: "0", count: 0 },
			regular: { balance: "0", count: 0 }
		};
		for (const account of HOLDERS_DATA_LET.accounts) {
			const type = get_holder_type(account.account_id);
			groups[type].balance = (
				BigInt(groups[type].balance) + BigInt(account.balance)
			).toString();
			groups[type].count++;
		}
		return groups;
	}
	// ============================================
	const TABS: Array<{ key: HOLDER_TYPE | "all"; label: string }> = [
		{ key: "all", label: "🌐" },
		{ key: "regular", label: HOLDER_EMOJI_WITH_REGULAR.regular },
		{ key: "dev", label: HOLDER_EMOJI.dev },
		{ key: "dex", label: HOLDER_EMOJI.dex },
		{ key: "vault", label: HOLDER_EMOJI.vault },
		{ key: "nft", label: HOLDER_EMOJI.nft },
		{ key: "burn", label: HOLDER_EMOJI.burn }
	];
</script>

<!-- ================================ -->
<!-- ================================ -->

<main>
	<h1 class="page-title">SHIT HOLDERS</h1>

	{#if LOADING_LET}
		<p class="loading">💩💩💩</p>
	{:else if ERROR_LET}
		<p class="error">Error: {ERROR_LET}</p>
	{:else if HOLDERS_DATA_LET && TOKEN_INFO_LET}
		<div class="tabs">
			{#each TABS as tab}
				<button
					class="tab-btn"
					class:active={ACTIVE_TAB_LET === tab.key}
					onclick={() => (ACTIVE_TAB_LET = tab.key)}
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<div class="group-totals">
			<h2>GROUP HOLDINGS</h2>
			<div class="group-grid">
				{#each Object.entries(get_group_totals() || {}) as [type, data]}
					{@const pct = get_percentage(data.balance)}
					<div class="group-item" class:active-group={ACTIVE_TAB_LET === type}>
						<span class="group-emoji">{HOLDER_EMOJI_WITH_REGULAR[type as HOLDER_TYPE]}</span>
						<span class="group-label">{type.toUpperCase()}</span>
						<span class="group-pct">{pct}</span>
						<span class="group-count">({data.count})</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="holders-card">
			<h2 class="holders-title">
				TOP {HOLDERS_DATA_LET.accounts.length} HOLDERS
				{#if ACTIVE_TAB_LET !== "all"}
					<span class="filtered-note">
						- Filtered: {HOLDER_EMOJI_WITH_REGULAR[ACTIVE_TAB_LET as HOLDER_TYPE]}
					</span>
				{/if}
			</h2>
			<div class="holders-header">
				<span class="col-rank">#</span>
				<span class="col-account">ACCOUNT</span>
				<span class="col-balance">BALANCE</span>
			</div>
			<ul class="holders-list">
				{#each get_filtered_holders() as holder, i}
					{@const type = get_holder_type(holder.account_id)}
					<li class="holder-item">
						<span class="col-rank">{i + 1}</span>
						<span class="col-account">
							<span class="holder-emoji">{HOLDER_EMOJI_WITH_REGULAR[type]}</span>
							<span class="holder-id" title={holder.account_id}>{holder.account_id}</span>
						</span>
						<span class="col-balance">
							<span class="balance-token">{format_balance(holder.balance)}</span>
							<span class="balance-usd">{get_usd_value(holder.balance, TOKEN_INFO_LET.price_usd)}</span>
							<span class="balance-pct">{get_percentage(holder.balance)}</span>
						</span>
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<p class="loading">💩💩💩</p>
	{/if}
	<!-- ================================ -->
	<a href="/shit"><button>🔙 BACK</button></a>
	<p>COPYRIGHT 2026 BY SLEET.NEAR</p>
</main>

<!-- ================================ -->
<!-- ================================ -->

<style>
	main {
		padding: 0px;
		width: 500px;
		margin: 0 auto;
		font-family: system-ui, -apple-system, sans-serif;
		max-width: 90vw;
		box-sizing: border-box;
	}
	.page-title {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 20px 0;
		text-align: center;
	}
	.loading,
	.error {
		text-align: center;
		padding: 40px;
	}
	.error {
		color: #d32f2f;
	}
	.tabs {
		display: flex;
		margin-bottom: 20px;
		background: #e0e0e0;
		border-radius: 8px;
		overflow: hidden;
	}
	.tab-btn {
		flex: 1;
		padding: 10px 8px;
		border: none;
		border-right: 1px solid #ccc;
		background: #f5f5f5;
		cursor: pointer;
		font-size: 1.2rem;
		transition: background 0.2s;
	}
	.tab-btn:last-child {
		border-right: none;
	}
	.tab-btn:hover {
		background: #e8e8e8;
	}
	.tab-btn.active {
		background: #333;
		color: #fff;
	}
.group-totals {
		padding: 16px;
		background: #f8f8f8;
		border-radius: 8px;
		margin-bottom: 20px;
	}
	.group-item,
	.holders-card {
		background: #fff;
	}
	.group-item {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 12px;
		border-radius: 6px;
		font-size: 0.85rem;
	}
	.holders-card {
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}
	.group-totals h2 {
		font-size: 1rem;
		margin: 0 0 12px 0;
		color: #333;
	}
	.group-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 8px;
	}
	.group-item.active-group {
		background: #333;
		color: #fff;
	}
	.group-item.active-group .group-label,
	.group-item.active-group .group-pct,
	.group-item.active-group .group-count {
		color: #fff;
	}
	.group-emoji {
		font-size: 1.1rem;
	}
	.group-label {
		font-weight: 600;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 70px;
	}
	.group-pct {
		margin-left: auto;
		font-weight: 700;
		color: #333;
	}
	.group-count {
		color: #999;
		font-size: 0.8rem;
	}
	.holders-title,
	.group-totals h2 {
		font-weight: 600;
		color: #333;
	}
	.holders-title {
		font-size: 1.1rem;
		margin: 0 0 16px 0;
	}
	.group-totals h2 {
		font-size: 1rem;
		margin: 0 0 12px 0;
	}
	.filtered-note {
		font-weight: 400;
		font-size: 0.9rem;
		color: #666;
	}
	.holders-header {
		display: flex;
		padding: 8px 0;
		border-bottom: 2px solid #e0e0e0;
		font-weight: 600;
		font-size: 0.75rem;
		color: #666;
		text-transform: uppercase;
	}
	.holders-list {
		list-style: none;
		padding: 0;
		margin: 0;
		max-height: 500px;
		overflow-y: auto;
	}
	.holder-item {
		display: flex;
		padding: 10px 0;
		border-bottom: 1px solid #f0f0f0;
		font-size: 0.85rem;
		align-items: center;
	}
	.holder-item:last-child {
		border-bottom: none;
	}
	.col-rank,
	.col-account,
	.col-balance {
		display: flex;
		align-items: center;
	}
	.col-rank {
		width: 40px;
		color: #999;
	}
	.col-account {
		flex: 1;
		min-width: 0;
		gap: 8px;
	}
	.holder-emoji {
		flex-shrink: 0;
	}
	.holder-id {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #333;
	}
	.col-balance {
		gap: 12px;
		white-space: nowrap;
	}
	.balance-token {
		font-weight: 600;
		min-width: 80px;
		text-align: right;
	}
	.balance-usd {
		color: #666;
		min-width: 80px;
		text-align: right;
	}
	.balance-pct {
		color: #999;
		min-width: 60px;
		text-align: right;
	}
</style>