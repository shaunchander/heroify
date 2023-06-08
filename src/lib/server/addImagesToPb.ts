/**
 * Adds images into Pocketbase after they've generated.
 */

import type { PromptsResponse } from '$lib/pocketbase-types';
import { pb } from './pb';

export const addImagesToPb = async (images: string[], inferenceId: string) => {
	const result = await pb
		.collection('prompts')
		.getFirstListItem<PromptsResponse>(`inferenceId="${inferenceId}"`);
	await pb.collection('prompts').update<PromptsResponse>(result.id, {
		images: JSON.stringify(images),
		status: true
	});
};
