import { validateLicense } from '@/lib/server/validateLicense';

export async function POST({ request }) {
	const { license } = await request.json();
	const { credits } = await validateLicense(license);
	return {
		status: 200,
		body: {
			credits
		}
	};
}
