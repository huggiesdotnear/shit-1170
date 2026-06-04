<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import COMPONENT_INPUT_CA from "$lib/components/input_ca.svelte";
	import COMPONENT_FT_FULL_TOKEN_INFO from "$lib/components/ft_full_token_info.svelte";
	// ===========

	onMount(() => {
		console.log($page.url.searchParams.get("token"));
	});

	let token = $derived($page.url.searchParams.get("token"));
	// ===========
</script>

<!-- ================================ -->
<!-- ================================ -->

<main>
	<h3>{token}</h3>
	<COMPONENT_INPUT_CA placeholder={token ?? ""} />
	{#if token}
		<COMPONENT_FT_FULL_TOKEN_INFO {token} />
	{/if}
	<p>COPYRIGHT 2026 BY SLEET.NEAR</p>
</main>

<!-- ================================ -->
<!-- ================================ -->

<style></style>
