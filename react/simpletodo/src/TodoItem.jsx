export function TodoItem({ id, text, done, deleteTodo, setList }) {
  return (
    <>
      <li className="list-item">
        <label className="list-item-label">
          <input
            type="checkbox"
            onChange={() => {
              setList((currentList) => {
                return currentList.map((todo) => {
                  if (todo.id === id) {
                    return { ...todo, done: !done };
                  } else {
                    return todo;
                  }
                });
              });
            }}
            data-list-item-checkbox
          />
          <span data-list-item-text>{text}</span>
        </label>
        <button data-button-delete onClick={() => deleteTodo(id)}>
          Delete
        </button>
      </li>
    </>
  );
}
