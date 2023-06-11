import { CLIPDROP_KEY } from '$env/static/private';
import { addBgStatustoPb } from '$lib/server/addBgStatusToPb.js';
import { addImagesToPb } from '$lib/server/addImagesToPb.js';
import { blobToBase64 } from '$lib/server/blobToBase64.js';
import { getPrompt } from '$lib/server/getPrompt.js';
import { leap } from '$lib/server/leap';
import { setFailed } from '$lib/server/setFailed.js';
import { json } from '@sveltejs/kit';
import { cloudinary } from '$lib/server/cloudinary';
import { pixelbin } from '$lib/server/pixelbin.js';

export async function GET({ params, cookies }) {
	const { inferenceId } = params;

	const license = cookies.get('license');
	if (!license) {
		return json({ error: true });
	}

	try {
		const result = await leap.generate.getInferenceJob({
			inferenceId: inferenceId,
			modelId: '1e7737d7-545e-469f-857f-e4b46eaa151d'
		});
		const data = await result.data;
		if (data) {
			if (data.state === 'failed') {
				await setFailed(license, data.id, data.numberOfImages);
				return new Response('Bad request.', { status: 400 });
			} else if (data.state === 'finished') {
				console.log('Images are done. Now checking if they need background removals...');
				const result = await getPrompt(data.id);
				if (result.removeBg) {
					if (!result.removeBgStatus) {
						console.log('Flagging images for background removal...');
						await addBgStatustoPb(data.id, true);
						const images: string[] = [];
						for (const image of data.images) {
							// const workingImage = await fetch(image.uri);
							// const imageBlob = await workingImage.blob();
							// const imgFile = new File([imageBlob], 'image.png', { type: 'image/png' });
							// const form = new FormData();
							// form.append('image_file', imgFile);
							// console.log('Removing background...');
							// const result = await fetch('https://clipdrop-api.co/remove-background/v1', {
							// 	method: 'POST',
							// 	headers: {
							// 		'x-api-key': CLIPDROP_KEY,
							// 		Accept: 'image/png'
							// 	},
							// 	body: form
							// });
							// console.log('Background removed! Sending images...');
							// if (!result.ok) {
							// 	await setFailed(license, data.id, data.numberOfImages);
							// 	throw new Error('Failed to remove background.');
							// } else {
							// 	const imageBlob = await result.arrayBuffer();
							// 	const base64 = URL.createObjectURL(imageBlob);
							// 	console.log('Uploading to Cloudinary...');
							// 	const cloudinaryResult = await cloudinary.v2.uploader.upload(base64);
							// 	console.log(cloudinaryResult);
							// 	console.log('Uploading complete! Returning image...');
							// 	await addBgStatustoPb(data.id, false);

							// 	images.push(cloudinaryResult.url);
							// }
							console.log('Uploading to PixelBin...');
							await pixelbin.urlUpload({
								url: image.uri,
								filenameOverride: true
							});
							console.log('Upload complete! Applying transformations...');
						}
						await addImagesToPb(images, data.id);
						return new Response('OK', { status: 201 });
					} else {
						return new Response('Processing...', { status: 200 });
					}
				} else {
					console.log('No background removals, adding image URLs to PB...');
					await addImagesToPb(
						data.images.map((image) => image.uri),
						data.id
					);
					console.log('Images added. Now returning...');
					return new Response('OK', { status: 201 });
				}
			} else {
				console.log('Inference is still procesing...');
				return new Response('Processing...', { status: 200 });
			}
		} else {
			return new Response('Bad request.', { status: 400 });
		}
	} catch (err) {
		return new Response('Bad request.', { status: 400 });
	}
}
