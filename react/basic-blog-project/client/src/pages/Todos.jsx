import { useLoaderData } from 'react-router-dom';

export const todosRoute = {
  loader,
  element: <Todos />,
};

function Todos() {
  const todos = useLoaderData();

  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'strike-through' : ''}>
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
}

function loader() {
  return fetch('http://localhost:3000/todos');
}
