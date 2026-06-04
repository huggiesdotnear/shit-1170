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
	let FULL_TOKEN_INFO_RESPONSE_STATE_LET: FULL_TOKEN_INFO_RESPONSE | null = $state(null);
	let FULL_TOKEN_INFO_LOADING_STATE_LET = $state(false);
	// ================================
	$effect(() => {
		if (!token) {
			FULL_TOKEN_INFO_RESPONSE_STATE_LET = null;
			return;
		}
		FULL_TOKEN_INFO_LOADING_STATE_LET = true;
		(async () => {
			try {
				FULL_TOKEN_INFO_RESPONSE_STATE_LET = await full_token_info_fun(token);
				console.log("= FULL_TOKEN_INFO_RESPONSE_STATE_LET =");
				console.log($state.snapshot(FULL_TOKEN_INFO_RESPONSE_STATE_LET));
			} catch (e) {
				console.error(e);
			} finally {
				FULL_TOKEN_INFO_LOADING_STATE_LET = false;
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
	<br />
	<COMPONENT_FT_FULL_TOKEN_INFO info={FULL_TOKEN_INFO_RESPONSE_STATE_LET} loading={FULL_TOKEN_INFO_LOADING_STATE_LET} />
	<br />
	{#if FULL_TOKEN_INFO_RESPONSE_STATE_LET}
		<COMPONENT_FT_TOP_HOLDERS token={token ?? ""} tokenInfo={FULL_TOKEN_INFO_RESPONSE_STATE_LET} />
	{/if}
	<p>COPYRIGHT 2026 BY SLEET.NEAR</p>
</main>

<!-- ================================ -->
<!-- ================================ -->

<style></style>
