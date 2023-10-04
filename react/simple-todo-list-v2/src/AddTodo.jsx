import { useContext, useRef } from 'react';
import { TodolistContext } from './context';
import { ACTIONS } from './todoReducer';

export function AddTodo() {
  const { dispatch } = useContext(TodolistContext);
  const newTodoRef = useRef();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (newTodoRef.current.value === '') {
          return;
        }
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
