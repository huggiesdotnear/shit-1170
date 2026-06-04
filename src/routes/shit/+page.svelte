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
	let loading = $state(false);
	// ================================
	$effect(() => {
		if (!token) {
			tokenInfo = null;
			return;
		}
		loading = true;
		(async () => {
			try {
				tokenInfo = await full_token_info_fun(token);
				console.log("======= full_token_info =======")
				console.log(tokenInfo)
			} catch (e) {
				console.error(e);
			} finally {
				loading = false;
			}
		})();
	});
	// ================================
</script>

<!-- ================================ -->
<!-- ================================ -->

<main>
	<h3>{token}</h3>
	<COMPONENT_INPUT_CA placeholder={token ?? ""} />
	<COMPONENT_FT_FULL_TOKEN_INFO info={tokenInfo} {loading} />
	{#if tokenInfo}
		<COMPONENT_FT_TOP_HOLDERS token={token ?? ""} tokenInfo={tokenInfo} />
	{/if}
	<p>COPYRIGHT 2026 BY SLEET.NEAR</p>
</main>

<!-- ================================ -->
<!-- ================================ -->

<style></style>
