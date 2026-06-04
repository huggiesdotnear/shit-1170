<script lang="ts">
	import { full_token_info_fun } from "$lib/ts/full_token_info_fun";
	import { format_number_with_commas } from "$lib/ts/format_number_with_commas"
	import type { FULL_TOKEN_INFO_RESPONSE } from "$lib/ts/full_token_info_fun";
	// ============================================
	interface PROPS {
		token: string;
	}
	// ============================================
	let { token }: PROPS = $props();
	let info: FULL_TOKEN_INFO_RESPONSE | null = $state(null);
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
				info = await full_token_info_fun(token);
			} catch (e) {
				error = e instanceof Error ? e.message : "Failed to fetch token info";
			} finally {
				loading = false;
			}
		})();
	});
	// ============================================
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<div class="ft-card">
	{#if loading}
		<p class="loading">💩💩💩</p>
	{:else if error}
		<p class="error">Error: {error}</p>
	{:else if info}
		{#if info.metadata.icon}
			<img src={info.metadata.icon} alt="{info.metadata.name} icon" class="ft-icon" />
		{/if}
		<h1 class="ft-name">{info.metadata.name}</h1>
		<p class="ft-detail">SYMBOL: ${info.metadata.symbol}</p>
		<p class="ft-detail">CA: {info.account_id}</p>
		<p class="ft-detail">DECIMALS: {info.metadata.decimals}</p>
		<p class="ft-detail">PRICE USD: {info.price_usd}</p>
		<p class="ft-detail">TOTAL SUPPLY: {info.total_supply}</p>
		<p class="ft-detail">CIRCULATING SUPPLY: {info.circulating_supply}</p>
		<p class="ft-detail">LIQUIDITY USD: {format_number_with_commas(info.liquidity_usd)}</p>
		<!-- <p class="ft-detail">VOLUME 24H: {info.volume_usd_24h}</p> -->
	{/if}
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style>
	.ft-card {
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

	.ft-icon {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
	}

	.ft-name {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
	}

	.ft-detail {
		margin: 8px 0;
		font-size: 0.9rem;
		color: #333;
		word-wrap: break-word;
		overflow-wrap: break-word;
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