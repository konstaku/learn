import { useContext } from 'react';
import { TodolistContext } from './context';
import { ACTIONS } from './todoReducer';

export function SearchBar() {
  const { state, dispatch } = useContext(TodolistContext);
  const { query, hideCompleted } = state;

  return (
    <div className="filter-form">
      <div className="filter-form-group">
        <label>
          Name:
          <input
            type="text"
            value={query}
            onChange={(e) => {
              dispatch({
                type: ACTIONS.FILTER_TODOS,
                payload: { query: e.target.value },
              });
            }}
          />
        </label>
      </div>
      <label>
        <input
          type="checkbox"
          checked={hideCompleted}
          onChange={(e) =>
            dispatch({
              type: ACTIONS.TOGGLE_HIDE_COMPLETED,
              payload: { checked: e.target.checked },
            })
          }
        />
        Hide completed
      </label>
    </div>
  );
}
