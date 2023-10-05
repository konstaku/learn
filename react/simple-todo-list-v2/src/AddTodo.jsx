import { useContext, useRef } from 'react';
import { TodolistContext } from './context';
import { ACTIONS } from './todoReducer';
import { Button, Input } from '@chakra-ui/react';

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
      <div id="new-todo-form" className="new-todo">
        <Input
          type="text"
          placeholder="New Todo"
          autoFocus
          autoComplete="off"
          maxLength={40}
          className="input new-todo"
          id="todo-input"
          ref={newTodoRef}
        />
        <Button className="new-todo" type="submit">
          Add Todo
        </Button>
      </div>
    </form>
  );
}
