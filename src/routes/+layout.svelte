<script lang="ts">
    import "@sleet-css/huggies-css/main.css";
	import favicon from "$lib/assets/favicon.svg";
	let { children } = $props();
</script>

<!-- ================================ -->
<!-- ================================ -->

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>shit-1170</title>
</svelte:head>

<!-- ================================ -->

{@render children()}
