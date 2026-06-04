<script lang="ts">
	import { goto } from "$app/navigation";

	let { placeholder = "token ca" }: { placeholder?: string } = $props();

	let value = $state("");

	function handleGo() {
		if (value.trim()) {
			goto(`/shit?token=${encodeURIComponent(value.trim())}`);
		}
	}
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<!-- component_input_ca -->
<!-- COMPONENT_INPUT_CA -->
<div>
	<input type="text" bind:value {placeholder} />
	<br />
	<button onclick={handleGo}>GO SHIT</button>
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style>
	input {
		padding: 0.5rem;
		width: 500px;
		max-width: 90vw;
		box-sizing: border-box;
	}
</style>
