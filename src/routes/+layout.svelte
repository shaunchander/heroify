<script>
	import '$lib/styles/tailwind.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="57x57" href="/favicons/favicon-57x57.png" />
	<link rel="apple-touch-icon" sizes="60x60" href="/favicons/favicon-60x60.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="/favicons/favicon-72x72.png" />
	<link rel="apple-touch-icon" sizes="76x76" href="/favicons/favicon-76x76.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="/favicons/favicon-114x114.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="/favicons/favicon-120x120.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="/favicons/favicon-144x144.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="/favicons/favicon-152x152.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/favicons/favicon-180x180.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
	<link rel="icon" type="image/png" sizes="192x192" href="/favicons/favicon-192x192.png" />
	<link rel="shortcut icon" type="image/x-icon" href="/favicons/favicon.ico" />
	<link rel="icon" type="image/x-icon" href="/favicons/favicon.ico" />
	<meta name="msapplication-TileColor" content="#161616" />
	<meta name="theme-color" content="#0072f5" />

	<meta name="msapplication-TileImage" content="/favicons/favicon-144x144.png" />
	<meta name="msapplication-config" content="/browserconfig.xml" />
	<title>Heroify</title>
	<meta
		name="description"
		content="Generate 3D graphics for your landing page using AI. Just ask heroify what you're looking for and get high quality graphics for your website."
	/>
	<meta
		name="og:description"
		content="Generate 3D graphics for your landing page using AI. Just ask heroify what you're looking for and get high quality graphics for your website."
	/>
</svelte:head>

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
