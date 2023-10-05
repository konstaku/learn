import { useContext } from 'react';
import { ToDoItem } from './ToDoItem';
import { TodolistContext } from './context';
import { Card, CardBody, Stack, StackDivider, Text } from '@chakra-ui/react';

export function TodoList() {
  const { state } = useContext(TodolistContext);

  return (
    <Card className="card">
      <CardBody className="card-body">
        <Stack divider={<StackDivider />} spacing="4">
          {state.todos.length > 0 ? (
            state.todos
              .filter((todo) => {
                if (state.hideCompleted && todo.checked) {
                  return false;
                }
                return todo.name
                  .toLowerCase()
                  .includes(state.query?.toLowerCase());
              })
              .map((todo) => <ToDoItem key={todo.id} {...todo} />)
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
