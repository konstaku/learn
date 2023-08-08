import React, { useState } from 'react';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const [list, setList] = useState([]);
  const [newTodoName, setNewTodoName] = useState('');

  return (
    <>
      <ul id="list">
        {list.map((item) => {
          return (
            <TodoItem
              key={item.id}
              {...item}
              deleteTodo={deleteTodo}
              setList={setList}
              list={list}
            />
          );
        })}
      </ul>

      <div id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input
          type="text"
          id="todo-input"
          value={newTodoName}
          onChange={(e) => setNewTodoName(() => e.target.value)}
          onKeyDown={(e) => e.code === 'Enter' && addTodo(newTodoName)}
        />
        <button onClick={() => addTodo(newTodoName)}>Add Todo</button>
      </div>
    </>
  );

  // Todo can be added via enter or pressing a button, so I abstracted it in a separate function
  function addTodo(name) {
    if (name === '') {
      return;
    }

    setList((currentList) => {
      return [
        ...currentList,
        {
          id: crypto.randomUUID(),
          text: name,
          done: false,
        },
      ];
    });

    // Clearing the input after todo is set
    setNewTodoName('');
  }

  function deleteTodo(id) {
    setList((currentList) => {
      return currentList.filter((todo) => todo.id !== id);
    });
  }
}
