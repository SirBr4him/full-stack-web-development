import PrismaClient from '$lib/prisma';

const prisma = new PrismaClient();

export const api = async ({ method, accept, todo, id }: ApiParams) => {
	let body: Todo[] | Todo | undefined;
	let status = 500;

	switch (method.toUpperCase()) {
		case 'GET': {
			body = await prisma.todo.findMany();
			status = 200;
			break;
		}
		case 'POST': {
			body = await prisma.todo.create({ data: { ...(todo as Todo) } });
			status = 201;
			break;
		}
		case 'DELETE': {
			body = await prisma.todo.delete({ where: { id } });
			status = 200;
			break;
		}
		case 'PATCH': {
			body = await prisma.todo.update({ where: { id }, data: { ...todo } });
			status = 200;
			break;
		}
		default: {
			break;
		}
	}

	if (method.toUpperCase() !== 'GET' && accept !== 'application/json') {
		return { status: 303, headers: { location: '/' } };
	}

	return { status, body };
};
