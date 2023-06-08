import type { PromptsRecord } from '$lib/pocketbase-types';
import { pb } from './pb';

/**
 * Adds a prompt and license combo to Pocketbase.
 */
export const addPromptToPb = async (
	prompt: string,
	license: string,
	inferenceId: string,
	numImages: number
) => {
	await pb.collection('prompts').create<PromptsRecord>({
		prompt,
		license,
		inferenceId,
		numImages
	});
};
