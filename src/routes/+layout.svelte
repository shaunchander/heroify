<script>
	import '$lib/styles/tailwind.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<Header />
<main class="flex-1 flex flex-col">
	<slot />
</main>
<Footer />

<img
	class="fixed inset-0 pointer-events-none select-none object-cover w-full h-full opacity-20 z-[-1]"
	src="/bg.png"
	alt=""
/>
