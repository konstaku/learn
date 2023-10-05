import { useContext } from 'react';
import { ToDoItem } from './ToDoItem';
import { TodolistContext } from './context';
import { Card, CardBody, Stack, StackDivider, Text } from '@chakra-ui/react';

export function TodoList() {
  const { state } = useContext(TodolistContext);
  const { todos, query, hideCompleted } = state;

  const filteredTodos = todos
    .filter((todo) => {
      if (hideCompleted && todo.checked) {
        return false;
      }
      return todo.name.toLowerCase().includes(query?.toLowerCase());
    })
    .map((todo) => <ToDoItem key={todo.id} {...todo} />);

  return (
    <Card className="card">
      <CardBody className="card-body">
        <Stack divider={<StackDivider />} spacing="4">
          {todos.length > 0 && filteredTodos.length > 0 ? (
            filteredTodos
          ) : query && filteredTodos.length === 0 ? (
            <Text className="no-todo-placeholder" color={'gray'}>
              🤷‍♂️ {`No results for "${query}"`}
            </Text>
          ) : (
            <Text className="no-todo-placeholder" color={'gray'}>
              👀 Nothing to do yet...
            </Text>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
