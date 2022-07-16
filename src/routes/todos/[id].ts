import type { RequestHandler } from '@sveltejs/kit';
import { api } from './_api';

export const DELETE: RequestHandler = ({ request, params }) => {
	return api({ method: request.method, id: params.id });
};

export const PATCH: RequestHandler = async ({ request, params }) => {
	const data = await request.formData();
	let todo: Partial<Todo> = {};

	if (data.has('text')) {
		todo = { ...todo, text: data.get('text') as string };
	}

	if (data.has('done')) {
		todo = { ...todo, done: data.get('done') === 'true' };
	}

	return api({ method: request.method, todo, id: params.id });
};
