import { useContext } from 'react';
import { TodolistContext } from './context';
import { ACTIONS } from './todoReducer';
import { Checkbox, Input, Text } from '@chakra-ui/react';

export function SearchBar() {
  const { state, dispatch } = useContext(TodolistContext);
  const { query, hideCompleted } = state;

  return (
    <>
      <div className="hide-completed-wrapper">
        <Checkbox
          className="checkbox"
          colorScheme="gray"
          size={'md'}
          data-list-item-checkbox
          defaultChecked={hideCompleted}
          onChange={(e) =>
            dispatch({
              type: ACTIONS.TOGGLE_HIDE_COMPLETED,
              payload: { checked: e.target.checked },
            })
          }
        />
        <Text fontSize={'sm'}>Hide completed</Text>
      </div>

      <Input
        type="text"
        placeholder="Search"
        defaultValue={query || null}
        variant={'flushed'}
        id="search-field"
        onChange={(e) => {
          dispatch({
            type: ACTIONS.FILTER_TODOS,
            payload: { query: e.target.value },
          });
        }}
      />
    </>
  );
}
