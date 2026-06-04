<script lang="ts">
	import { page } from "$app/stores";
	import COMPONENT_INPUT_CA from "$lib/components/input_ca.svelte";
	import COMPONENT_FT_FULL_TOKEN_INFO from "$lib/components/ft_full_token_info.svelte";
	import COMPONENT_FT_TOP_HOLDERS from "$lib/components/ft_top_holders.svelte";
	import { full_token_info_fun } from "$lib/ts/full_token_info_fun";
	import type { FULL_TOKEN_INFO_RESPONSE } from "$lib/ts/full_token_info_fun";
	// ================================
	$effect(() => {
		console.log("================================");
		console.log($page.url.searchParams.get("token"));
		console.log("================================");
	});
	let token = $derived($page.url.searchParams.get("token"));
	let tokenInfo: FULL_TOKEN_INFO_RESPONSE | null = $state(null);
	// ================================
	$effect(() => {
		if (!token) {
			tokenInfo = null;
			return;
		}
		(async () => {
			tokenInfo = await full_token_info_fun(token);
		})();
	});
	// ================================
</script>

<!-- ================================ -->
<!-- ================================ -->

<main>
	<h3>{token}</h3>
	<COMPONENT_INPUT_CA placeholder={token ?? ""} />
	{#if token}
		<COMPONENT_FT_FULL_TOKEN_INFO {token} />
		<COMPONENT_FT_TOP_HOLDERS {token} tokenInfo={tokenInfo} />
	{/if}
	<p>COPYRIGHT 2026 BY SLEET.NEAR</p>
</main>

<!-- ================================ -->
<!-- ================================ -->

<style></style>
