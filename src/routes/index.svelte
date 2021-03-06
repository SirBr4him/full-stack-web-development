<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/todos');
		if (res.ok) {
			const todos = await res.json();
			return { props: { todos } };
		}

		const { message } = await res.json();

		return { error: new Error(message) };
	};
</script>

<script lang="ts">
	import TodoItem from '$lib/todo-item.svelte';
	import { enhance } from '$lib/actions/form';

	export let todos: Todo[];

	const onAdded = (resp: Todo, form?: HTMLFormElement) => {
		todos = [resp, ...todos];
		form?.reset();
	};

	const onEdited = (resp: Todo) => {
		todos = todos.map((t) => (t.id === resp.id ? resp : t));
	};

	const onDeleted = (resp: Todo) => {
		todos = todos.filter((t) => t.id !== resp.id);
	};

	const title = 'Todos';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="todos">
	<h1>{title}</h1>
	<form
		action="/todos"
		method="post"
		class="new"
		use:enhance={{ result: onAdded }}
	>
		<input
			type="text"
			name="text"
			aria-label="Add a todo"
			placeholder="+ tap to add a todo"
		/>
	</form>

	{#each todos as todo}
		<TodoItem {todo} {onDeleted} {onEdited} />
	{/each}
</div>

<style>
	.todos {
		width: 100%;
		max-width: 42rem;
		margin: 4rem auto 0 auto;
	}

	.todos :global(input) {
		border: 1px solid transparent;
	}

	.todos :global(input:focus-visible) {
		box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid #f1754c !important;
		outline: none;
	}

	.new {
		margin: 0 0 0.5rem 0;
	}

	.new input {
		font-size: 28px;
		width: 100%;
		padding: 0.5em 1em 0, 3em 1em;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		text-align: center;
	}
</style>
