import { TodoItem } from '../components/TodoItem';
import { Todo } from '../types/types';

function getTodos() {
  return fetch('http://localhost:3001/todos').then(response => response.json());
}

export default async function Todos() {
  const todos = await getTodos();
  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}
