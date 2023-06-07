import { LEAP_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { validateLicense } from '@/lib/server/validateLicense';
import { pb } from '$lib/server/pb';

export async function POST({ cookies, request }) {
	const { prompt, numImages, removeBg } = await request.json();

	const license = cookies.get('license');
	if (!prompt || !license) error(400, 'Bad request.');

	const { valid, credits } = await validateLicense(license);
	if (!valid || credits === 0) {
		throw error(400, 'No credits available for this license.');
	}

	if (Number(numImages) > credits) {
		throw error(400, 'The number of images requested exceeds the credit limit for this license.');
	}

	const url =
		'https://api.tryleap.ai/api/v1/images/models/aa180b1a-6b98-413c-92e6-d3a198dce8dd/inferences';

	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			authorization: `Bearer ${LEAP_API_KEY}`
		},
		body: JSON.stringify({
			prompt: `(${prompt}), (((2d vector design style))), (((isometric style))), tiny, cute, soft lighting, soft pastel colors, pastel background, matte, soft gradient, low polygon count`,
			negativePrompt:
				'out of frame, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature',
			steps: 50,
			width: 512,
			height: 512,
			numberOfImages: Number(numImages),
			promptStrength: 7.5,
			enhancePrompt: true,
			upscaleBy: 'x2',
			sampler: 'ddim'
		})
	};

	console.log('Sending request to Leap...');
	const data = await fetch(url, options);
	const json = await data.json();

	if (!data.ok) {
		console.log(json);
		throw error(
			500,
			'Something went wrong when generating your image. Please contact us at support@heroify.lol'
		);
	}
	console.log('Request successful. Generating image...');

	console.log('Deducting credits from license...');
	const workingLicense = await pb.collection('licenses').getFirstListItem(`license="${license}"`);
	await pb.collection('licenses').update(workingLicense.id, {
		credits: workingLicense.credits - Number(numImages)
	});
	console.log('Credits deducted.');

	return new Response(JSON.stringify(json), { status: 201 });
}
