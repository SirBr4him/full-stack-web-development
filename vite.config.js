import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		port: process.env.HRM_HOST ? 443 : 5173,
		host: process.env.HRM_HOST
			? process.env.HRM_HOST.substring('https://'.length)
			: 'localhost'
	}
};

export default config;
