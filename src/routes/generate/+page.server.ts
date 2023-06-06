export function load({ cookies }) {
	const credits = cookies.get('license') || 0;
	return {
		credits
	};
}
