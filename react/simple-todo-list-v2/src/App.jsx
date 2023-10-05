import { TodoList } from './TodoList';
import { SearchBar } from './SearchBar';
import { AddTodo } from './AddTodo';
import { TodolistContextProvider } from './context';
import './styles.css';

function App() {
  return <TodoApp />;
}

function TodoApp() {
  return (
    <>
      <TodolistContextProvider>
        <SearchBar />
        <TodoList />
        <AddTodo />
      </TodolistContextProvider>
    </>
  );
}

export default App;
