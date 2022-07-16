const todos = new Map();

export const api = ({ method, todo, id }: ApiParams) => {
	let body: Todo[] | Todo | undefined;
	let status = 500;

	switch (method.toUpperCase()) {
		case 'GET': {
			body = Array.from(todos.values()).reverse();
			status = 200;
			break;
		}
		case 'POST': {
			todos.set(todo?.id, todo);
			status = 201;
			body = todo as Todo;
			break;
		}
		case 'DELETE': {
			body = todos.get(id);
			todos.delete(id);
			status = 200;
			break;
		}
		case 'PATCH': {
			const uTodo = { ...todos.get(id), ...todo };
			todos.set(id, uTodo);
			body = todos.get(id);
			status = 200;
			break;
		}
		default: {
			break;
		}
	}

	if (method.toUpperCase() !== 'GET') {
		return { status: 301, headers: { location: '/' } };
	}

	return { status, body };
};
