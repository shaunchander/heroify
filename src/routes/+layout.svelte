<script>
	import '@/styles/tailwind.css';
	import Container from '@/components/Container.svelte';
	import Header from '@/components/Header.svelte';
	import { XIcon } from 'svelte-feather-icons';
</script>

<Header />
<main class="flex-1 flex flex-col">
	<slot />
</main>

<footer class="p-6 space-y-4">
	<div class="w-full h-px bg-white/10" />

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
						<a class="link link-primary text-sm font-semibold" href="/privacy-policy">Contact</a>
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

<!-- Get credits modal -->
<div class="modal">
	<label class="modal-overlay" for="modal-2" />
	<div class="modal-content flex flex-col gap-5">
		<label for="modal-1" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
			><XIcon /></label
		>
		<h2 class="text-xl">Modal title 1</h2>
		<span
			>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur dolorum voluptate ratione
			dicta. Maxime cupiditate, est commodi consectetur earum iure, optio, obcaecati in nulla saepe
			maiores nobis iste quasi alias!</span
		>
		<div class="flex gap-3">
			<button class="btn btn-error btn-block">Delete</button>

			<button class="btn btn-block">Cancel</button>
		</div>
	</div>
</div>

<img
	class="fixed inset-0 pointer-events-none select-none object-cover w-full h-full opacity-20 z-[-1]"
	src="/bg.png"
	alt=""
/>
