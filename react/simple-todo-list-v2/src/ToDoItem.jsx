import { useContext } from 'react';
import { TodolistContext } from './TodolistContext';
import { ACTIONS } from './TodolistContext';

export function ToDoItem({ id, name, checked }) {
  if (!name) return;
  const { dispatch } = useContext(TodolistContext);

  return (
    <li className="list-item">
      <label className="list-item-label">
        <input
          type="checkbox"
          data-list-item-checkbox
          checked={checked}
          onChange={() =>
            dispatch({ type: ACTIONS.TOGGLE_CHECKED, payload: { id, checked } })
          }
        />
        <span data-list-item-text>{name}</span>
      </label>

      <button
        type="button"
        data-button-delete
        onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id } })}
      >
        Delete
      </button>
    </li>
  );
}
