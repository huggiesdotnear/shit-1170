<script lang="ts">
	import { near_kit_client } from "@near-kit-tool-box/web";
	import { ft_metadata_fun, ft_total_supply_fun } from "@near-kit-tool-box/fun";
	import type { FT_METADATA_TYPE } from "@near-kit-tool-box/fun";
	// ============================================
	interface PROPS {
		token: string;
	}
	// ============================================
	let { token }: PROPS = $props();
	let metadata: FT_METADATA_TYPE | null = $state(null);
	let totalSupply: string | null = $state(null);
	let loading = $state(true);
	let error = $state<string | null>(null);
	// ============================================
	$effect(() => {
		if (!token) {
			loading = false;
			metadata = null;
			totalSupply = null;
			return;
		}
		loading = true;
		error = null;
		(async () => {
			try {
				const near = near_kit_client();
				const [metadataResult, supplyResult] = await Promise.all([
					await ft_metadata_fun(near, token),
					await ft_total_supply_fun(near, token)
				]);
				metadata = metadataResult;
				totalSupply = supplyResult;
			} catch (e) {
				error = e instanceof Error ? e.message : "Failed to fetch metadata";
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
	{:else if metadata}
		<div class="ft-header">
			{#if metadata.icon}
				<img src={metadata.icon} alt="{metadata.name} icon" class="ft-icon" />
			{/if}
			<h1 class="ft-name">{metadata.name}</h1>
		</div>
		<p class="ft-detail">SYMBOL: ${metadata.symbol}</p>
		<p class="ft-detail">CA: {token}</p>
		<p class="ft-detail">DECIMALS: {metadata.decimals}</p>
		<p class="ft-detail">TOTAL SUPPLY: {totalSupply}</p>
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

	.ft-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
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
