import { error, json } from '@sveltejs/kit';
import { pb } from '@/lib/server/pb.js';
import generateLicenseKey from '@mcnaveen/license-gen';

export async function GET({ request }) {
	const license = generateLicenseKey(8);
	try {
		await pb.collection('licenses').create({
			license,
			credits: 10
		});

		return new Response('OK.', { status: 201 });
	} catch (err) {
		console.log(err);
		throw error(
			500,
			'Something went wrong when creating your license. Please contact us at support@heroify.lol'
		);
	}
}
