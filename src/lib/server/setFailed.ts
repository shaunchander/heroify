/**
 * Sets a failed prompt in Pocketbase.
 */

import type {
	LicensesRecord,
	LicensesResponse,
	PromptsRecord,
	PromptsResponse
} from '$lib/pocketbase-types';
import { pb } from './pb';

export const setFailed = async (license: string, inferenceId: string, numImages: number) => {
	try {
		const promptsResult = await pb
			.collection('prompts')
			.getFirstListItem<PromptsResponse>(`inferenceId="${inferenceId}"`);

		if (promptsResult.isFailed) return; // Don't do anything if it's already failed (this is a safety check

		await pb.collection('prompts').update<PromptsRecord>(promptsResult.id, {
			isFailed: true
		});
		const licensesResult = await pb
			.collection('licenses')
			.getFirstListItem<LicensesResponse>(`license="${license}"`);
		await pb.collection('licenses').update<LicensesRecord>(licensesResult.id, {
			credits: licensesResult.credits + numImages
		});
	} catch (err) {
		console.log(err);
	}
};
