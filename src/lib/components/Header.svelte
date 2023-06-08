<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import { PUBLIC_CHECKOUT } from '$env/static/public';
</script>

<header class="sticky top-0 inset-x-0 p-6 space-y-4 backdrop-blur-sm z-50">
	<Container>
		<nav class="flex justify-between items-center">
			<div>
				<a href="/" class="flex items-center gap-x-2">
					<div
						class="w-8 h-8 rounded-sm bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center pointer-events-none select-none"
					>
						<p class="font-black font-panchang">h</p>
					</div>
					<p class="font-black text-lg">heroify</p></a
				>
			</div>
			<div>
				<a href={PUBLIC_CHECKOUT} class="btn btn-primary">Get Credits</a>
			</div>
		</nav>
	</Container>
</header>
