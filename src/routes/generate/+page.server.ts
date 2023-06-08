import { addLicenseToPb } from '$lib/server/addLicenseToPb';
import { getCredits } from '$lib/server/getCredits';
import { validateLicense } from '$lib/server/validateLicense';
import { leap } from '$lib/server/leap';
import { getPrompts } from '$lib/server/getPrompts';
import { addPromptToPb } from '$lib/server/addPromptToPb.js';
import { deductCredits } from '$lib/server/deductCredits.js';

export async function load({ cookies }) {
	const license = cookies.get('license');

	if (license) {
		const isValid = await validateLicense(license);
		if (!isValid) {
			return {
				isValid
			};
		} else {
			const credits = await getCredits(license);
			const prompts = await getPrompts(license);
			if (prompts) {
				prompts.reverse();

				return {
					isValid,
					credits,
					prompts
				};
			}
			return {
				isValid,
				credits
			};
		}
	} else {
		return {
			isValid: false
		};
	}
}

export const actions = {
	license: async ({ cookies, request }) => {
		const data = await request.formData();
		const license = (data.get('license') as string) ?? '';

		if (!license) {
			return {
				invalidLicense: true
			};
		} else {
			const data = await fetch('https://api.lemonsqueezy.com/v1/licenses/activate', {
				method: 'POST',
				body: JSON.stringify({ license_key: license, instance_name: 'heroify' }),
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});
			const json = await data.json();
			if (!json.activated) {
				return {
					invalidLicense: true
				};
			} else {
				await addLicenseToPb(license, json.meta.variant_name);
				cookies.set('license', license);
			}
		}
	},
	prompt: async ({ request, cookies }) => {
		console.log('Recieved prompt request. Validating license...');
		const license = cookies.get('license');

		if (!license) {
			console.log('License rejected.');
			return;
		} else {
			const isValid = await validateLicense(license);
			if (!isValid) {
				console.log('License rejected.');
				return;
			} else {
				console.log('License accepted. Checking credits...');
				const data = await request.formData();
				const prompt = (data.get('prompt') as string) ?? '';
				const numImages = data.get('numImages');
				const removeBg = data.get('removeBg');

				const credits = await getCredits(license);

				if (!prompt) {
					return {
						invalidPrompt: true
					};
				}

				if (credits < Number(numImages)) {
					console.log("Not enough credits. Can't generate image.");
					return {
						invalidCredits: true
					};
				} else {
					console.log('Generating image...');
					const result = await leap.generate.createInferenceJob({
						prompt: `(${prompt}), (((2d isometric vector design style))), tiny, cute, soft lighting, soft pastel colors, pastel background, matte, soft gradient, low polygon count`,
						negativePrompt:
							'out of frame, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature',
						steps: 30,
						enhancePrompt: true,
						numberOfImages: Number(numImages),
						width: 512,
						height: 512,
						upscaleBy: 'x2'
					});
					console.log('Image queued. Adding to DB...');
					const data = await result.data;
					if (data) {
						await addPromptToPb(prompt, license, data.id, Number(numImages));
						await deductCredits(license, Number(numImages));
					} else {
						return {
							leapError: true
						};
					}
				}
			}
		}
	}
};
