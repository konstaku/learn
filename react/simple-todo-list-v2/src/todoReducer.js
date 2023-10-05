export const ACTIONS = {
  TOGGLE_CHECKED: 'TOGGLE_CHECKED',
  DELETE_TODO: 'DELETE_TODO',
  ADD_TODO: 'ADD_TODO',
  FILTER_TODOS: 'FILTER_TODOS',
  TOGGLE_HIDE_COMPLETED: 'TOGGLE_HIDE_COMPLETED',
  TOGGLE_EDIT: 'TOGGLE_EDIT',
  EDIT_TODO: 'EDIT_TODO',
};

export function todoReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: crypto.randomUUID(),
            name: payload.name,
            checked: false,
          },
        ],
      };
    }

    case ACTIONS.EDIT_TODO: {
      return payload.name === ''
        ? {
            ...state,
            todos: state.todos.filter((todo) => todo.id !== payload.id),
          }
        : {
            ...state,
            todos: state.todos.map((todo) =>
              todo.id === payload.id
                ? { ...todo, name: payload.name, isEdit: false }
                : todo
            ),
          };
    }

    case ACTIONS.DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload.id),
      };
    }

    case ACTIONS.FILTER_TODOS: {
      return {
        ...state,
        query: payload.query,
      };
    }

    case ACTIONS.TOGGLE_CHECKED: {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id ? { ...todo, checked: !payload.checked } : todo
        ),
      };
    }

    case ACTIONS.TOGGLE_HIDE_COMPLETED: {
      return {
        ...state,
        hideCompleted: payload.checked,
      };
    }

    case ACTIONS.TOGGLE_EDIT: {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id ? { ...todo, isEdit: !payload.isEdit } : todo
        ),
      };
    }

    default: {
      return state;
    }
  }
}
