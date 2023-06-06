import { error, json } from '@sveltejs/kit';
import { pb } from '@/lib/pb.js';

export function POST({ request }) {
	console.log(request);
	return new Response('sdf');
}
