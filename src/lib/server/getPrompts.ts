/**
 * Gets a list of prompts and images for a license.
 */

import type { PromptsResponse } from '$lib/pocketbase-types';
import { pb } from './pb';

export const getPrompts = async (license: string) => {
	try {
		const result = await pb.collection('prompts').getFullList<PromptsResponse>({
			filter: `license="${license}"`
		});
		return structuredClone(result);
	} catch (err) {
		return;
	}
};
