<script lang="ts">
	import { scale } from 'svelte/transition';
	import { PUBLIC_CHECKOUT, PUBLIC_CHECKOUT_25, PUBLIC_CHECKOUT_50 } from '$env/static/public';
	import { enhance } from '$app/forms';
	import Section from '@/components/Section.svelte';
	import Container from '@/components/Container.svelte';

	import { prompt } from '@/stores/prompt';
	import { ImageIcon, HelpCircleIcon, DownloadCloudIcon } from 'svelte-feather-icons';

	import { cn } from 'nano-classnames';

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

	let inferenceId = '';
</script>

<Section id="generate">
	<Container>
		<div
			class={cn('space-y-6 md:max-w-xl md:mx-auto lg:max-w-full lg:grid lg:gap-10 lg:grid-cols-2', [
				!data.isValid || (data.credits === 0 && !form?.images),
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
											Keep your prompts short and specific! We recommend 1-3 sentences.
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
									<div class="popover-content popover-right">
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
								The number of images you're trying to generate exceeds the credit limit.
							</p>{/if}
					</form>
				</div>
				<div>
					<span class="flex items-center gap-2">
						<span class="dot dot-primary" />
						<span class="text-sm font-medium">{data.credits ?? 0} credits remaining </span>
					</span>
				</div>
			</div>
			<div class="space-y-4">
				<div
					class="rounded-xl border-white/10 bg-backgroundSecondary p-2 h-48 lg:h-full border-2 border-dashed"
				>
					{#if !form?.images}
						<div class="space-y-2 text-content3 flex flex-col justify-center items-center h-full">
							<ImageIcon />
							<p class="text-sm font-medium">Generated renders will appear here...</p>
						</div>
					{:else}
						<ul class={cn('grid gap-2', [form.images.length > 1, 'grid-cols-2', ''])}>
							{#each form.images as img}
								<a
									href={img.uri}
									download
									class="block hover:scale-95 transition duration-300 ease-in-out transform relative group"
								>
									<img
										width={512}
										height={512}
										alt=""
										src={img.uri}
										class="rounded-lg inline-block"
									/>
									<div
										class="inset-0 pointer-events-none absolute flex items-center justify-center scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out"
									>
										<div
											class="w-20 h-20 flex items-center justify-center rounded-full bg-primary/50"
										>
											<DownloadCloudIcon class="w-10 h-10" />
										</div>
									</div>
								</a>
							{/each}
						</ul>
					{/if}
					{#if form?.images}
						<div class="flex space-x-2 text-sm text-content3 mt-4">
							<HelpCircleIcon class="w-4 h-4" />

							<p>Heroify does not save images. Click on images to download them.</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</Container>

	{#if !data.isValid || (data.credits === 0 && !form?.images)}
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
