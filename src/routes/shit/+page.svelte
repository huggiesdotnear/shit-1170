<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	onMount(() => {
		console.log($page.url.searchParams.get('token'));
	});

	let token = $derived($page.url.searchParams.get('token'));
</script>

<!-- ================================ -->
<!-- ================================ -->

<main>
    <h3>{token}</h3>
    <p>COPYRIGHT 2026 BY SLEET.NEAR</p>
</main>

<!-- ================================ -->
<!-- ================================ -->

<style></style>