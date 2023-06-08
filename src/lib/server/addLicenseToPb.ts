/**
 * Adds a license and credits to Pocketbase.
 */

import type { LicensesRecord } from '$lib/pocketbase-types';
import { pb } from './pb';

export const addLicenseToPb = async (license: string, variant: string) => {
	const credits = {
		'10 Credits': 10,
		'25 Credits': 25,
		'50 Credits': 50
	};
	try {
		await pb.collection('licenses').create<LicensesRecord>({
			license,
			credits: credits[variant as keyof typeof credits]
		});
	} catch (err) {
		console.log(err);
	}
};
