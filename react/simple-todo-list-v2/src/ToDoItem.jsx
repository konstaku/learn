export function ToDoItem({ id, name, checked, deleteTodo, toggleChecked }) {
  if (!name) return;

  return (
    <li className="list-item">
      <label className="list-item-label">
        <input
          type="checkbox"
          data-list-item-checkbox
          checked={checked}
          onChange={(e) => toggleChecked(id, e.target.checked)}
        />
        <span data-list-item-text>{name}</span>
      </label>

      <button type="button" data-button-delete onClick={() => deleteTodo(id)}>
        Delete
      </button>
    </li>
  );
}
