/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				'2xl': '1300px'
			}
		}
	},
	plugins: [require('rippleui')]
};
