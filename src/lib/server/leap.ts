import { Leap } from '@leap-ai/sdk';
import { LEAP_API_KEY } from '$env/static/private';

const leap = new Leap(LEAP_API_KEY);
leap.useModel('aa180b1a-6b98-413c-92e6-d3a198dce8dd');

export { leap };
