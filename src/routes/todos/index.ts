import type { RequestHandler } from '@sveltejs/kit';

const todos: Todo[] = [];

export const GET: RequestHandler = () => {
	return {
		status: 200,
		body: todos
	};
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();

	todos.push({
		done: false,
		text: data.get('text') as string,
		createdAt: new Date(Date.now())
	});

	return {
		status: 301,
		headers: {
			location: '/'
		}
	};
};
