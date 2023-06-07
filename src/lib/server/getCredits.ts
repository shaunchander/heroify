/**
 * Gets the number of credits for a particular license.
 */
import { pb } from './pb';
import type { LicensesResponse } from '../pocketbase-types';

export const getCredits = async (license: string) => {
	try {
		const data = await pb
			.collection('licenses')
			.getFirstListItem<LicensesResponse>(`license="${license}"`);
		return data.credits;
	} catch (err) {
		return 0;
	}
};
