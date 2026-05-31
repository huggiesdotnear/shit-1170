<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { HUGGIES_SLOGANS } from '$lib/ts/slogans';
	// ================================
	const getRandomSlogan = () => HUGGIES_SLOGANS[Math.floor(Math.random() * HUGGIES_SLOGANS.length)];
	// ================================
	onMount(() => {
		setTimeout(() => {
			goto('/shit?token=shit-1170.meme-cooking.near');
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