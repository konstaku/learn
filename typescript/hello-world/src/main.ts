type Todo = {
  id: string;
  name: string;
  completed: boolean;
};
type NewTodo = Partial<Todo>;

const todoInput = document.querySelector<HTMLInputElement>('#todo-input');
const form = document.querySelector<HTMLFormElement>('#new-todo-form');
const list = document.querySelector<HTMLUListElement>('#list');

console.log('localStorage:', localStorage.getItem('todos'));

const newTodoText: NewTodo = {};

let todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');

if (todos.length) {
  for (const todo of todos) {
    createTodoElement(todo);
  }
}

if (!todoInput || !form || !list) {
  throw new Error('One of form elements is missing!');
} else {
  todoInput.addEventListener('keyup', saveOnChange);
  form.addEventListener('submit', onSubmit);
  list.addEventListener('click', handleTodoDelete);
}

function saveOnChange(e: KeyboardEvent): void {
  newTodoText.name = (e.target as HTMLInputElement).value;
}

function onSubmit(e: SubmitEvent) {
  e.preventDefault();
  if (newTodoText.name) {
    addTodo(newTodoText.name);
  }
}

function addTodo(text: string): void {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    name: text,
    completed: false,
  };

  todos.push(newTodo);
  createTodoElement(newTodo);

  localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoElement({ id, name, completed }: Todo): void {
  const li = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const span = document.createElement('span');
  const button = document.createElement('button');

  button.innerText = 'Delete';
  input.type = 'checkbox';
  input.checked = completed;
  span.innerText = name;

  li.className = 'list-item';
  li.id = id;
  label.className = 'list-item-label';
  input.className = 'label-input';
  button.className = 'delete-btn';
  span.className = 'label-text';

  label.append(input);
  label.append(span);
  li.append(label);
  li.append(button);
  list.append(li);
  todoInput.value = '';
}

function handleTodoDelete(e: MouseEvent) {
  console.log('click');

  if (!(e.target instanceof Element)) {
    console.log('!(e.target instanceof Element)');
    return;
  }

  const li = e.target.closest('li');
  const id = li?.id;

  if (e.target.className === 'delete-btn') {
    todos = todos.filter((todo) => todo.id !== id);

    li?.remove();
  }

  if (e.target.className === 'label-input') {
    const completedTodo = todos.find((todo) => todo.id === id);
    if (completedTodo) {
      completedTodo.completed = !completedTodo?.completed;
    }
  }

  localStorage.setItem('todos', JSON.stringify(todos));
}
