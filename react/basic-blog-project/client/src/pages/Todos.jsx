import { useLoaderData, useNavigation } from 'react-router-dom';

export default function Todos() {
  const todos = useLoaderData();
  const { state } = useNavigation();

  return (
    <div className={`container${state === 'loading' ? ' loading' : ''}`}>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'strike-through' : ''}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
