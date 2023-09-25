import { useState } from 'react';
import { ToDoItem } from './ToDoItem';
import { NewToDo } from './NewToDo';

import './styles.css';

function App() {
  return <ToDoList />;
}

function ToDoList() {
  const [todos, setTodos] = useState([]);

  return (
    <>
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
      <NewToDo addTodo={addTodo} />
    </>
  );

  function addTodo(text) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), name: text, checked: false },
    ]);
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
