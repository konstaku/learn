import { useContext, useRef, useState } from 'react';
import { ACTIONS, TodolistContext } from './TodolistContext';

export function AddTodo() {
  const { dispatch } = useContext(TodolistContext);
  const newTodoRef = useRef();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: ACTIONS.ADD_TODO,
          payload: { name: newTodoRef.current.value },
        });
        newTodoRef.current.value = '';
      }}
    >
      <div id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input type="text" id="todo-input" ref={newTodoRef} />
        <button>Add Todo</button>
      </div>
    </form>
  );
}
