import { json } from '@sveltejs/kit';

export async function POST({ request, fetch }) {
	const data = await request.json();

	const { url } = data;
	const result = await fetch(url);
	return new Response(result.body, {
		headers: {
			'Content-Type': 'image/png',
			'Content-Disposition': 'attachment; filename="render.png'
		}
	});
}
