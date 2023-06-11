import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '$env/static/private';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
	secure: true,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
	cloud_name: 'heroify'
});

export { cloudinary };
