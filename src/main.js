import './styles/main.scss';
let todos = [];

const buttonAddTodo = document.querySelector('.add_todo');
console.log(buttonAddTodo);
buttonAddTodo.addEventListener('click', () => {
  addTodo();
})

function renderTodos() {
  const todoList = document.getElementById('todo_list');
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('todo_item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    checkbox.addEventListener('change', () => toggleTodoStatus(checkbox, listItem));

    const todoText = document.createElement('span');
    todoText.textContent = todo;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove item';
    removeButton.addEventListener('click', () => removeTodo(index));

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTodo(listItem.querySelector('span')));

    listItem.appendChild(checkbox);
    listItem.appendChild(todoText);
    listItem.appendChild(removeButton);
    listItem.appendChild(editButton);

    todoList.appendChild(listItem);


  });
}

function addTodo() {
  const newTodoInput = document.getElementById('new_todo');
  const newTodo = newTodoInput.value.trim();//get value from input

  if (newTodo !== '') {
    todos.push(newTodo);
    newTodoInput.value = '';
    renderTodos();
  }
}

function removeTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function editTodo(listItem, id) {
  listItem.setAttribute('contenteditable', 'true');
  listItem.focus();
  listItem.addEventListener('blur', () => {
    saveTodoChanges(id, listItem.textContent);
  });

  listItem.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      listItem.blur();
    }
  });
}
function saveTodoChanges(id, newText) {
  console.log(`Saved changes for ${id}: ${newText}`);
}

function toggleTodoStatus(checkbox, listItem) {
  console.log(checkbox);
  if (checkbox.checked) {
    listItem.classList.add('completed');

  } else {
    listItem.classList.remove('completed');
  }
}
