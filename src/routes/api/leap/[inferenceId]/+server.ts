import { addImagesToPb } from '$lib/server/addImagesToPb.js';
import { leap } from '$lib/server/leap';
import { setFailed } from '$lib/server/setFailed.js';
import { json } from '@sveltejs/kit';

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
				await addImagesToPb(
					data.images.map((image) => image.uri),
					data.id
				);
				return new Response('OK', { status: 201 });
			} else {
				return new Response('Processing...', { status: 200 });
			}
		} else {
			return new Response('Bad request.', { status: 400 });
		}
	} catch (err) {
		return new Response('Bad request.', { status: 400 });
	}
}
