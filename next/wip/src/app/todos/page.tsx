import Link from 'next/link';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function getTodos() {
  return fetch('https://jsonplaceholder.typicode.com/todos').then(response =>
    response.json()
  );
}

export default async function Todos() {
  const todos: Todo[] = await getTodos();

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
