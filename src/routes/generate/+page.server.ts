import { LEAP_API_KEY } from '$env/static/private';
import { deductCredits } from '@/lib/server/deductCredits.js';
import { getCredits } from '@/lib/server/getCredits';
import { validateLicense } from '@/lib/server/validateLicense';
import { Leap } from '@leap-ai/sdk';

const leap = new Leap(LEAP_API_KEY);
leap.useModel('1e7737d7-545e-469f-857f-e4b46eaa151d');

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
		const isValid = await validateLicense(license);

		if (!isValid) {
			return {
				invalidLicense: true
			};
		} else {
			cookies.set('license', license);
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

				if (credits < Number(numImages)) {
					console.log("Not enough credits. Can't generate image.");
					return {
						invalidCredits: true
					};
				} else {
					console.log('Generating image...');
					const result = await leap.generate.generateImage({
						prompt: `(${prompt}), (((2d vector design style))), (((isometric style))), tiny, cute, soft lighting, soft pastel colors, pastel background, matte, soft gradient, low polygon count`,
						negativePrompt:
							'out of frame, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature',
						steps: 50,
						enhancePrompt: true,
						numberOfImages: Number(numImages)
					});
					if (!result.error) {
						console.log('Images generated. Deducting credits...');
						await deductCredits(license, Number(numImages));
						console.log('Credits deducted');

						return {
							images: result.data?.images
						};
					} else {
						console.log(result.error);
						return {
							error: result.error
						};
					}
				}
			}
		}
	}
};
