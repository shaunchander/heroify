<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { PUBLIC_CHECKOUT, PUBLIC_CHECKOUT_25, PUBLIC_CHECKOUT_50 } from '$env/static/public';
	import { enhance } from '$app/forms';
	import Section from '$lib/components/Section.svelte';
	import Container from '$lib/components/Container.svelte';

	import { prompt } from '$lib/stores/prompt';
	import { ImageIcon, HelpCircleIcon, DownloadCloudIcon } from 'svelte-feather-icons';

	import { cn } from 'nano-classnames';
	import { invalidateAll } from '$app/navigation';

	export let data;
	export let form;

	enum STATUS {
		IDLE,
		LOADING,
		ERROR
	}

	let license = '';
	let images: string[] = [];
	let numImages = 1;

	let error = '';
	let status: STATUS = STATUS.IDLE;

	onMount(() => {
		if (data.prompts) {
			data.prompts.forEach((prompt) => {
				if (!prompt.status) {
					const watchInference = setInterval(async () => {
						const result = await fetch(`/api/leap/${prompt.inferenceId}`);
						if (result.status !== 200) {
							invalidateAll();
							clearInterval(watchInference);
						}
					}, 5_000);
				}
			});
		}
	});

	const handleDownload = async (url: string) => {
		const result = await fetch('/api/img', {
			method: 'POST',
			body: JSON.stringify({ url })
		});
		const blob = await result.blob();
		const imageURL = URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = imageURL;
		link.download = 'image file name here';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};
</script>

<Section id="generate">
	<Container>
		<div
			class={cn('space-y-6 md:max-w-xl md:mx-auto lg:max-w-full lg:grid lg:gap-10 lg:grid-cols-2', [
				!data.isValid,
				'blur-sm',
				''
			])}
		>
			<div class="space-y-2">
				<div class="space-y-2">
					<form method="POST" action="?/prompt" class="space-y-4">
						<label for="prompt" class="space-y-2">
							<div class="flex items-center gap-x-2">
								<span class="text-sm font-medium">Prompt</span>
								<div class="popover popover-hover flex items-center">
									<label class="popover-trigger"><HelpCircleIcon class="w-4 h-4" /></label>
									<div class="popover-content popover-right">
										<div class="popover-arrow" />
										<div class="p-4 text-sm">
											Enter a short, 1-3 sentence description of what you're looking for. Ex: 'a
											desk with a laptop on it'.
										</div>
									</div>
								</div>
							</div>
							<textarea
								id="prompt"
								class="textarea textarea-block resize-none h-32 w-full block bg-backgroundPrimary/50"
								bind:value={$prompt}
								name="prompt"
							/>
							{#if form?.invalidPrompt}
								<p class="text-red-600 text-sm">Please enter a prompt.</p>
							{/if}
							{#if form?.leapError}
								<p class="text-red-600 text-sm">
									Something went wrong when generating your image. No credits were deducted. Please
									try again.
								</p>
							{/if}
						</label>
						<div class="space-y-2">
							<p class="text-sm font-medium">No. of images to generate</p>
							<div class="btn-group btn-group-scrollable">
								<input
									type="radio"
									name="numImages"
									data-content="1"
									class="btn bg-backgroundPrimary/50"
									bind:group={numImages}
									value={1}
									checked
								/>
								<input
									type="radio"
									name="numImages"
									data-content="2"
									class="btn bg-backgroundPrimary/50"
									bind:group={numImages}
									value={2}
								/>
								<input
									type="radio"
									name="numImages"
									data-content="3"
									class="btn bg-backgroundPrimary/50"
									bind:group={numImages}
									value={3}
								/>
								<input
									type="radio"
									name="numImages"
									data-content="4"
									class="btn bg-backgroundPrimary/50"
									bind:group={numImages}
									value={4}
								/>
							</div>
						</div>

						<label class="flex items-center space-x-4 cursor-pointer" for="background">
							<div class="flex items-center gap-x-2">
								<span class="text-sm font-medium">Remove background?</span>
								<div class="popover popover-hover flex items-center">
									<label class="popover-trigger"><HelpCircleIcon class="w-4 h-4" /></label>
									<div class="popover-content popover-bottom-center lg:popover-right">
										<div class="popover-arrow" />
										<div class="p-4 text-sm">
											Removes the background gradients from the generated renders, giving you a
											transparent PNG.
										</div>
									</div>
								</div>
							</div>
							<input
								id="background"
								name="background"
								type="checkbox"
								class="switch switch-ghost-primary"
							/>
						</label>
						<button
							on:click={() => {
								status = STATUS.LOADING;
							}}
							class={cn('btn btn-lg btn-block', [
								status === STATUS.LOADING,
								'btn-loading',
								'btn-primary'
							])}
						>
							Generate ({numImages} credit{numImages > 1 ? 's' : ''})
						</button>
						{#if status === STATUS.ERROR}
							<p class="text-red-500 text-sm">{error}</p>{/if}
						{#if form?.invalidCredits}
							<p class="text-red-500 text-sm">
								The number of images you're trying to generate exceeds your credit limit.
							</p>{/if}
					</form>
				</div>
				<div>
					<span class="flex items-center gap-2">
						<span class="dot dot-primary" />
						<span class="text-sm font-medium"
							>You have <strong>{data.credits ?? 0} credits</strong> remaining
						</span>
					</span>
				</div>
			</div>
			<div class="space-y-4">
				<div
					class="rounded-xl border-white/10 bg-backgroundSecondary p-4 border-2 border-dashed space-y-4 divide-y divide-white/5 divide-dashed"
				>
					{#if data.prompts && data.prompts.length > 0}
						{#each data.prompts as prompt}
							<div class="space-y-2 pt-2">
								<div class="flex items-center gap-x-2 justify-between">
									<div>
										<p class="font-medium text-content2 whitespace-nowrap text-ellipsis">
											{prompt.prompt}
										</p>
									</div>
									{#if !prompt.status}
										<span class="badge badge-outline space-x-1">
											<div class="spinner-circle spinner-xs spinner-primary" />
											<span>Generating</span>
										</span>
									{:else if prompt.isFailed}
										<div class="flex items-center gap-x-1">
											<span class="badge badge-flat-error">
												<span>Failed</span>
											</span>
										</div>
									{:else}
										<span class="badge badge-flat-success">Completed</span>
									{/if}
								</div>
								<ul class="gap-x-1 grid grid-cols-4">
									{#if !prompt.status}
										{#each new Array(prompt.numImages).fill(0) as _}
											<li class="w-full">
												<div class="skeleton aspect-square w-full rounded-lg" />
											</li>
										{/each}
									{:else}
										{#each prompt.images as img}
											<li class="w-full">
												<button
													class="block hover:scale-95 transition duration-300 ease-in-out transform"
													on:click|preventDefault={() => handleDownload(img)}
												>
													<img src={img} class="aspect-square w-full rounded-lg" alt="" /></button
												>
											</li>
										{/each}
									{/if}
								</ul>
							</div>
						{/each}
					{:else}
						<div class="space-y-2 text-content3 flex flex-col justify-center items-center">
							<ImageIcon />
							<p class="text-sm font-medium">Generated renders will appear here...</p>
						</div>
					{/if}
				</div>
				{#if data.prompts}
					<div class="flex items-center gap-x-1">
						<div>
							<HelpCircleIcon class="w-4 h-4 text-content3" />
						</div>
						<div>
							<p class="text-xs text-content3">Click on renders to download them</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</Container>

	{#if !data.isValid}
		<input class="modal-state" id="modal-3" type="checkbox" checked />
		<div class="modal">
			<label class="modal-overlay" />
			<div intro={true} transition:scale={{ delay: 200 }} class="modal-content flex flex-col gap-5">
				<div class="space-y-2">
					<h2 class="text-xl">No credits!</h2>
					<p>
						You currently have 0 credits! To get started with heroify, purchase credits below or
						redeem a license.
					</p>
				</div>
				<ul class="grid gap-2 lg:grid-cols-3">
					<li>
						<a
							href={PUBLIC_CHECKOUT}
							target="_blank"
							class="flex items-center justify-between lg:flex-col rounded-lg border border-white/10 p-4 hover:border-white/30 transition duration-300"
						>
							<h3 class="text-white">10 credits</h3>
							<p class="font-semibold text-content2">$10</p>
						</a>
					</li>
					<li>
						<a
							href={PUBLIC_CHECKOUT_25}
							target="_blank"
							class="flex items-center justify-between lg:flex-col rounded-lg border border-white/10 p-4 hover:border-white/30 transition duration-300"
						>
							<h3 class="text-white">25 credits</h3>
							<p class="font-semibold text-content2">$20</p>
						</a>
					</li>
					<li>
						<a
							href={PUBLIC_CHECKOUT_50}
							target="_blank"
							class="flex items-center justify-between lg:flex-col rounded-lg border border-white/10 p-4 hover:border-white/30 transition duration-300"
						>
							<h3 class="text-white">50 credits</h3>
							<p class="font-semibold text-content2">$35</p>
						</a>
					</li>
				</ul>
				<div>
					<p class="text-xs text-center text-content3 font-bold">1 credit = 1 image</p>
				</div>
				<div class="divider divider-horizontal">OR</div>

				<form use:enhance method="POST" action="?/license" class="flex flex-col gap-3">
					<label for="license">
						<input
							class="input input-lg input-block font-mono text-center"
							placeholder="Enter license..."
							required
							name="license"
							id="license"
							bind:value={license}
						/>
					</label>
					{#if form?.invalidLicense}
						<p class="text-sm text-red-500">Invalid license.</p>{/if}
					<button class="btn btn-block" class:btn-primary={license}>Redeem License</button>
				</form>
			</div>
		</div>{/if}
</Section>
