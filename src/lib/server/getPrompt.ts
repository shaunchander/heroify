/**
 * Gets a singular prompt based on the inference id.
 */

import type { PromptsResponse } from '$lib/pocketbase-types';
import { pb } from './pb';

export const getPrompt = async (inferenceId: string) => {
	const result = await pb
		.collection('prompts')
		.getFirstListItem<PromptsResponse>(`inferenceId="${inferenceId}"`);
	return result;
};
