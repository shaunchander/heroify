<script>
	import Container from '$lib/components/Container.svelte';
</script>

<footer class="p-6 space-y-4">
	<div class="w-10/12 mx-auto h-px bg-white/10" />

	<Container>
		<div class="space-y-2 md:space-y-0 md:flex md:items-center md:justify-between">
			<div>
				<ul class="flex items-center gap-2 justify-center">
					<li>
						<a class="link link-primary text-sm font-semibold" href="/privacy-policy"
							>Privacy Policy</a
						>
					</li>
					<li>
						<a
							class="link link-primary text-sm font-semibold"
							href="mailto:shaunchander+heroify@gmail.com">Contact</a
						>
					</li>
				</ul>
			</div>
			<div class="text-center md:order-first">
				<p class="text-white">
					Made with 🍵 (matcha) by <a
						href="https://twitter.com/shaunchander"
						target="_blank"
						class="link link-primary">Shaun Chander</a
					>
				</p>
			</div>
		</div>
	</Container>
</footer>
