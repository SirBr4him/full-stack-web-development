/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

type Todo = {
	id?: string;
	createdAt: Date;
	text: string;
	done: boolean;
};

type ApiParams = {
	method: string;
	todo?: Partial<Todo>;
	id?: string;
};
