<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import COMPONENT_INPUT_CA from "$lib/components/input_ca.svelte";

	onMount(() => {
		console.log($page.url.searchParams.get("token"));
	});

	let token = $derived($page.url.searchParams.get("token"));
</script>

<!-- ================================ -->
<!-- ================================ -->

<main>
	<h3>{token}</h3>
	<COMPONENT_INPUT_CA />
	<p>COPYRIGHT 2026 BY SLEET.NEAR</p>
</main>

<!-- ================================ -->
<!-- ================================ -->

<style></style>
