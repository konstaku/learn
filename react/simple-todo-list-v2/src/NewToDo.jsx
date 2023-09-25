import { useState } from 'react';

export function NewToDo({ addTodo }) {
  const [value, setValue] = useState('');

  return (
    <div id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input
        type="text"
        id="todo-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={() => {
          addTodo(value);
          setValue(() => '');
        }}
      >
        Add Todo
      </button>
    </div>
  );
}
