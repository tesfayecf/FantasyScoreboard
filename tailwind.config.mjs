/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	theme: {
		extend: {
			transitionProperty: {
				'all': 'all',
			},
		},
	},
	content: [
		"./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
	],
	plugins: [],
}
