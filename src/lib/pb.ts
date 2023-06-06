import Pocketbase from 'pocketbase';
export const pb = new Pocketbase(import.meta.env.PUBLIC_POCKETBASE_URL);
