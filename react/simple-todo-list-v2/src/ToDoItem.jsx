import { useContext, useRef } from 'react';
import { TodolistContext } from './context';
import { ACTIONS } from './todoReducer';

export function ToDoItem({ id, name, checked, isEdit }) {
  const editRef = useRef();
  const { dispatch } = useContext(TodolistContext);

  if (!name) return;

  return (
    <li className="list-item">
      {isEdit ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({
              type: ACTIONS.EDIT_TODO,
              payload: { id, name: editRef.current.value },
            });
          }}
        >
          <input type="text" defaultValue={name} ref={editRef} />
          <button>Save</button>
        </form>
      ) : (
        <label className="list-item-label">
          <input
            type="checkbox"
            data-list-item-checkbox
            checked={checked}
            onChange={() =>
              dispatch({
                type: ACTIONS.TOGGLE_CHECKED,
                payload: { id, checked },
              })
            }
          />
          <span data-list-item-text>{name}</span>
        </label>
      )}

      <button
        type="button"
        data-button-edit
        onClick={() =>
          dispatch({ type: ACTIONS.TOGGLE_EDIT, payload: { id, isEdit } })
        }
      >
        Edit
      </button>
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
