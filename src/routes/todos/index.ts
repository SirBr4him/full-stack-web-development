import type { RequestHandler } from '@sveltejs/kit';
import { api } from './_api';

export const GET: RequestHandler = ({ request }) => {
	return api({ method: request.method, accept: request.headers.get('accept') });
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();
	return api({
		method: request.method,
		accept: request.headers.get('accept'),
		todo: {
			id: `${Date.now()}`,
			done: false,
			text: data.get('text') as string,
			createdAt: new Date()
		}
	});
};
