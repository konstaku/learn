import { notFound } from 'next/navigation';
import type { Todo } from '../page';

async function getTodo(id: string) {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then(
    response => response.json()
  );
}

export default async function Todo({ params }: { params: { id: string } }) {
  const todo: Todo = await getTodo(params.id);

  if (todo.title === undefined) return notFound();

  return (
    <>
      <h1>Todo #{todo.id}</h1>
      <p>{todo.title}</p>
    </>
  );
}
