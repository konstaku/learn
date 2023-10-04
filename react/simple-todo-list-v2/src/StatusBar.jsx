import { useContext, useState } from 'react';
import { ACTIONS, TodolistContext } from './TodolistContext';

export function StatusBar() {
  const [searchValue, setSearchValue] = useState('');
  const { dispatch } = useContext(TodolistContext);

  return (
    <>
      <label>
        Name:
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(() => e.target.value);
            dispatch({
              type: ACTIONS.FILTER_TODOS,
              payload: { query: e.target.value },
            });
          }}
        />
      </label>
      <label>
        <input
          type="checkbox"
          onChange={(e) =>
            dispatch({
              type: ACTIONS.TOGGLE_HIDE_COMPLETED,
              payload: { checked: e.target.checked },
            })
          }
        />{' '}
        Hide completed
      </label>
    </>
  );
}
