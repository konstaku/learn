import React from 'react';
import { Name } from './Name';
import { TodoListItem } from './TodoListItem';

function App() {
  return (
    <div>
      <TodoListItem isComplete={true}>Wake up</TodoListItem>
      <TodoListItem isComplete={false}>Watch TV</TodoListItem>
      <TodoListItem isComplete={false}>Be a dick</TodoListItem>
    </div>
  );
}

export default App;
