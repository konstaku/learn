import { createContext, useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

export const TodolistContext = createContext();
const INITIAL_STATE = {
  todos: [],
  query: '',
  hideCompleted: false,
};

export function TodolistContextProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, undefined, () => {
    const savedState = localStorage.getItem('state');
    return savedState ? JSON.parse(savedState) : INITIAL_STATE;
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
