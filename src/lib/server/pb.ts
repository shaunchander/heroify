import { POCKETBASE_PASSWORD, POCKETBASE_URL } from '$env/static/private';
import Pocketbase from 'pocketbase';
export const pb = new Pocketbase(POCKETBASE_URL);

pb.admins.authWithPassword('admin@heroify.lol', POCKETBASE_PASSWORD);
