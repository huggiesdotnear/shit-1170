<script lang="ts">
	import { goto } from "$app/navigation";
	import { setNetwork_mainnet } from "@near-kit-tool-box/web";
	import { onMount } from "svelte";
	import { HUGGIES_SLOGANS } from "$lib/ts/slogans";
	// ================================
	const getRandomSlogan = () => HUGGIES_SLOGANS[Math.floor(Math.random() * HUGGIES_SLOGANS.length)];
	// ================================
	onMount(() => {
		setNetwork_mainnet();
		setTimeout(() => {
			goto("/shit?token=shit-1170.meme-cooking.near");
		}, 1000);
	});
</script>

<!-- ================================ -->
<!-- ================================ -->

<section>
	<h1>HUGGIES</h1>
	<p>{getRandomSlogan()}</p>
</section>

<!-- ================================ -->
<!-- ================================ -->

<style></style>
