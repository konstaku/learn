import { createContext, useReducer } from 'react';

export const ACTIONS = {
  TOGGLE_CHECKED: 'TOGGLE_CHECKED',
  DELETE_TODO: 'DELETE_TODO',
  ADD_TODO: 'ADD_TODO',
  FILTER_TODOS: 'FILTER_TODOS',
  TOGGLE_HIDE_COMPLETED: 'TOGGLE_HIDE_COMPLETED',
};

export const TodolistContext = createContext();

export function TodolistContextProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [{ id: crypto.randomUUID(), name: 'Test todo #1', checked: false }],
    query: '',
    hideCompleted: false,
  });

  return (
    <TodolistContext.Provider value={{ state, dispatch }}>
      {children}
    </TodolistContext.Provider>
  );
}

function todoReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.TOGGLE_CHECKED: {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id ? { ...todo, checked: !payload.checked } : todo
        ),
      };
    }
    case ACTIONS.DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload.id),
      };
    }
    case ACTIONS.ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: crypto.randomUUID(),
            name: payload.name,
            checked: false,
          },
        ],
      };
    }
    case ACTIONS.FILTER_TODOS: {
      return {
        ...state,
        query: payload.query,
      };
    }
    case ACTIONS.TOGGLE_HIDE_COMPLETED: {
      console.log('toggle gide completed');
      return {
        ...state,
        hideCompleted: payload.checked,
      };
    }
  }
}
