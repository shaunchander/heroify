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
		const data = await pb
			.collection('licenses')
			.getFirstListItem<LicensesResponse>(`license="${license}"`);
		if (data.credits >= 0) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		return false;
	}
};
