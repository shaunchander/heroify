import { PIXELBIN_KEY } from '$env/static/private';
import { PixelbinConfig, PixelbinClient } from '@pixelbin/admin';

const config = new PixelbinConfig({
	domain: 'https:/api.pixelbin.io',
	apiSecret: PIXELBIN_KEY
});

export const pixelbin = new PixelbinClient(config);
