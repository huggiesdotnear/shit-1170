<script lang="ts">
	import { top_holders_fun } from "$lib/ts/top_holders_fun";
	// ============================================
	interface PROPS {
		token: string;
	}
	// ============================================
	let { token }: PROPS = $props();
	let info: Awaited<ReturnType<typeof top_holders_fun>> | null = $state(null);
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
			} catch (e) {
				error = e instanceof Error ? e.message : "Failed to fetch top holders";
			} finally {
				loading = false;
			}
		})();
	});
	// ============================================
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<div class="th-card">
	{#if loading}
		<p class="loading">💩💩💩</p>
	{:else if error}
		<p class="error">Error: {error}</p>
	{:else if info}
		<h1 class="th-title">Top {info.accounts.length} Holders</h1>
		<p class="th-total">Token: {info.token_id}</p>
		<ul class="th-list">
			{#each info.accounts as holder}
				<li class="th-item">
					<span class="th-account">{holder.account_id}</span>
					<span class="th-balance">{holder.balance}</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style>
	.th-card {
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
		margin: 0 0 8px 0;
	}

	.th-total {
		margin: 0 0 16px 0;
		font-size: 0.9rem;
		color: #666;
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
	}

	.th-balance {
		margin-left: 12px;
		white-space: nowrap;
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