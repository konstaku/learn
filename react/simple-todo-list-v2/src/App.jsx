import { useContext, useReducer } from 'react';
import { TodoList } from './TodoList';
import { StatusBar } from './StatusBar';
import { AddTodo } from './AddTodo';
import { TodolistContextProvider } from './TodolistContext';
import './styles.css';

function App() {
  return <TodoApp />;
}

function TodoApp() {
  return (
    <>
      <TodolistContextProvider>
        <StatusBar />
        <hr />
        <TodoList />
        <AddTodo />
      </TodolistContextProvider>
    </>
  );
}

export default App;
