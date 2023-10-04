import { useContext } from 'react';
import { ToDoItem } from './ToDoItem';
import { TodolistContext } from './TodolistContext';

export function TodoList() {
  const { state } = useContext(TodolistContext);

  return (
    <ul id="list">
      {state.todos
        .filter((todo) => {
          if (state.hideCompleted && todo.checked) {
            return false;
          }
          return todo.name.toLowerCase().includes(state.query.toLowerCase());
        })
        .map((todo) => (
          <ToDoItem key={todo.id} {...todo} />
        ))}
    </ul>
  );
}
