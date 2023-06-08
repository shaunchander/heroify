import { pb } from './pb';
import type { LicensesResponse } from '../pocketbase-types';

/**
 * Fetches a license from the database and checks if it is valid based on the number of credits.
 */
export const validateLicense = async (license: string | undefined) => {
	if (!license) {
		return false;
	}

	try {
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
			return false;
		} else {
			return true;
		}
	} catch (err) {
		return false;
	}
};
