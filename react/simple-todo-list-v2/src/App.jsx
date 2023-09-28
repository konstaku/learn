import { useState } from 'react';
import { ToDoItem } from './ToDoItem';

import './styles.css';

function App() {
  return <ToDoList />;
}

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('in on submit, value:', value);
        console.log('todos:', todos);
        addTodo(value);
        setValue(() => '');
      }}
    >
      <ul id="list">
        {todos.map((todo) => (
          <ToDoItem
            key={todo.id}
            {...todo}
            deleteTodo={deleteTodo}
            toggleChecked={toggleChecked}
          />
        ))}
      </ul>
      <div id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input
          type="text"
          id="todo-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>Add Todo</button>
      </div>
    </form>
  );

  function addTodo(text) {
    console.log('in add todo');
    setTodos((currentTodos) => {
      console.log('in set todos, current todos', currentTodos);
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), name: text, checked: false },
      ];
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  function toggleChecked(id, checked) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked };
        }
        return todo;
      });
    });
  }
}

export default App;
