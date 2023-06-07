/**
 * Helper that deducts credits from a user's account after generating an image.
 */

import type { LicensesResponse } from '../pocketbase-types';
import { pb } from './pb';

export const deductCredits = async (license: string, numImages: number) => {
	const workingLicense = await pb
		.collection('licenses')
		.getFirstListItem<LicensesResponse>(`license="${license}"`);

	await pb.collection('licenses').update<LicensesResponse>(workingLicense.id, {
		credits: workingLicense.credits - numImages
	});
};
