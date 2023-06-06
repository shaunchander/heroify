<script lang="ts">
	import { scale, blur } from 'svelte/transition';
	import { PUBLIC_STRIPE_TEST_PRODUCT } from '$env/static/public';

	import Section from '@/components/Section.svelte';
	import Container from '@/components/Container.svelte';

	import { prompt } from '@/stores/prompt';
	import { ImageIcon, HelpCircleIcon, XIcon } from 'svelte-feather-icons';

	import { cn } from 'nano-classnames';

	export let data;
	console.log(import.meta.env);
</script>

<Section id="generate">
	<Container>
		<div
			class={cn('space-y-6 md:max-w-xl md:mx-auto lg:max-w-full lg:grid lg:gap-10 lg:grid-cols-2', [
				data.credits,
				'',
				'blur-sm'
			])}
		>
			<div class="space-y-2">
				<div class="space-y-2">
					<form action="" class="space-y-4">
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
								value={$prompt}
							/>
						</label>
						<div class="space-y-2">
							<p class="text-sm font-medium">No. of images to generate</p>
							<div class="btn-group btn-group-scrollable">
								<input
									type="radio"
									name="options"
									data-content="1"
									class="btn bg-backgroundPrimary/50"
								/>
								<input
									type="radio"
									name="options"
									data-content="2"
									class="btn bg-backgroundPrimary/50"
								/>
								<input
									type="radio"
									name="options"
									data-content="3"
									class="btn bg-backgroundPrimary/50"
								/>
								<input
									type="radio"
									name="options"
									data-content="4"
									class="btn bg-backgroundPrimary/50"
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
						<button class="btn btn-primary btn-lg btn-block">Generate</button>
						<div class="flex items-center gap-x-2">
							<div class="flex-1">
								<button class="btn btn-primary btn-lg btn-block">Get Credits</button>
							</div>
							<div class="flex-1">
								<label class="btn btn-outline-primary btn-lg" for="modal-1">Redeem License</label>
								<input class="modal-state" id="modal-1" type="checkbox" />
								<div class="modal">
									<label class="modal-overlay" for="modal-1" />
									<div class="modal-content flex flex-col gap-5">
										<label
											for="modal-1"
											class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
											><XIcon class="w-4 h-4" /></label
										>
										<h2 class="text-xl">Enter license</h2>
										<input class="input input-lg" placeholder="Enter license..." />

										<div class="flex gap-3">
											<button class="btn btn-primary btn-block">Submit</button>

											<label for="modal-1" class="btn btn-block">Cancel</label>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div>
					<!-- <span class="flex items-center gap-2">
						<span class="dot dot-primary" />
						<span class="text-sm font-medium"
							>10 credits remaining (<a href="" class="link link-primary text-xs"
								>Purchase more credits?</a
							>)</span
						>
					</span> -->
					<span class="flex items-center gap-2">
						<span class="dot dot-error" />
						<span class="text-sm font-medium"
							>No credits remaining, purchase credits to get started!
						</span>
					</span>
				</div>
			</div>
			<div
				class="rounded-xl border-white/10 bg-backgroundSecondary p-4 h-48 lg:h-full border-2 border-dashed"
			>
				<div class="flex items-center justify-center flex-col h-full text-content3">
					<ImageIcon />
					<p class="text-sm font-medium">Generated renders will appear here...</p>
				</div>
			</div>
		</div>
	</Container>

	{#if !data.credits}
		<input class="modal-state" id="modal-3" type="checkbox" checked />
		<div class="modal">
			<label class="modal-overlay" />
			<div intro={true} in:scale={{ delay: 200 }} class="modal-content flex flex-col gap-5">
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
							href={PUBLIC_STRIPE_TEST_PRODUCT}
							target="_blank"
							class="flex items-center justify-between lg:flex-col rounded-lg border border-white/10 p-4 hover:border-white/30 transition duration-300"
						>
							<h3 class="text-white">10 credits</h3>
							<p class="font-semibold text-content2">$10</p>
						</a>
					</li>
					<li>
						<a
							href="https://buy.stripe.com/28ocOQfHvfD0bxS002"
							target="_blank"
							class="flex items-center justify-between lg:flex-col rounded-lg border border-white/10 p-4 hover:border-white/30 transition duration-300"
						>
							<h3 class="text-white">25 credits</h3>
							<p class="font-semibold text-content2">$20</p>
						</a>
					</li>
					<li>
						<a
							href="https://buy.stripe.com/aEU4ik7aZ2Qe45qfZ1"
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

				<div class="flex flex-col md:flex-row gap-3">
					<button class="btn btn-block">Redeem License</button>
				</div>
			</div>
		</div>{/if}
</Section>
