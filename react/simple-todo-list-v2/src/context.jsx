import { createContext, useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

export const TodolistContext = createContext();

export function TodolistContextProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, undefined, () => {
    if (localStorage.getItem('state')) {
      return JSON.parse(localStorage.getItem('state'));
    }
    return {
      todos: [
        { id: crypto.randomUUID(), name: 'Test todo #1', checked: false },
      ],
      query: '',
      hideCompleted: false,
    };
  });

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);

  return (
    <TodolistContext.Provider value={{ state, dispatch }}>
      {children}
    </TodolistContext.Provider>
  );
}
