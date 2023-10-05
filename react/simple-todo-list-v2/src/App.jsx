import { TodoList } from './TodoList';
import { SearchBar } from './SearchBar';
import { AddTodo } from './AddTodo';
import { TodolistContextProvider } from './context';
import { ChakraProvider } from '@chakra-ui/react';
import './styles.css';

function App() {
  return <TodoApp />;
}

function TodoApp() {
  return (
    <div className="main-container">
      <ChakraProvider>
        <TodolistContextProvider>
          <SearchBar />
          <TodoList />
          <AddTodo />
        </TodolistContextProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
