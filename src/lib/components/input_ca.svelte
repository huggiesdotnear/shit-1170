<script lang="ts">
	import { goto } from '$app/navigation';

	let value = $state('');

	function handleGo() {
		if (value.trim()) {
			goto(`/shit?token=${encodeURIComponent(value.trim())}`);
		}
	}
</script>

<div>
	<input type="text" bind:value placeholder="token ca" />
	<button onclick={handleGo}>Go</button>
</div>

<style>
	div {
		display: flex;
		gap: 0.5rem;
	}
	input {
		padding: 0.5rem;
	}
</style>
