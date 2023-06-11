import type { PromptsRecord, PromptsResponse } from '$lib/pocketbase-types';
import { pb } from './pb';

/**
 * Quickly sets the background remover status in Pocketbase.
 */
export const addBgStatustoPb = async (inferenceId: string, status: boolean) => {
	const result = await pb
		.collection('prompts')
		.getFirstListItem<PromptsResponse>(`inferenceId="${inferenceId}"`);

	await pb.collection('prompts').update<PromptsRecord>(result.id, {
		removeBgStatus: status
	});
};
