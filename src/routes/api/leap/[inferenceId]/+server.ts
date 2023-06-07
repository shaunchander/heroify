import { LEAP_API_KEY } from '$env/static/private';
export async function GET({ params }) {
	const { inferenceId } = params;

	const url = `https://api.tryleap.ai/api/v1/images/models/aa180b1a-6b98-413c-92e6-d3a198dce8dd/inferences/${inferenceId}`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			authorization: `Bearer ${LEAP_API_KEY}}`
		}
	};

	const data = await fetch(url, options);
	const json = await data.json();
	return new Response(json, { status: 200 });
}
