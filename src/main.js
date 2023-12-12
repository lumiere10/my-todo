import './styles/main.scss';
import './styles/common.scss';

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let liItem = 0;
let isEditing = false;
let editingTodoId;

const buttonShowDialog = document.querySelector('.add_todo');
const buttonCloseDialog = document.querySelector('.close');
const buttonSaveDialog = document.querySelector('.btn_save');
const modalWindow = document.querySelector('#dialog');
const filterButton = document.querySelectorAll('.filter');

buttonShowDialog.addEventListener('click', () => showDialog());
buttonCloseDialog.addEventListener('click', closeDialog);
buttonSaveDialog.addEventListener('click', saveToLocalStorage);
filterButton.forEach(btn => {
  btn.addEventListener('click', function () {
    const filteredTodos = filterTodos(btn);
    renderTodos(filteredTodos);
  });
});

function showDialog() {
  isEditing = false;
  const newTodoInputTitle = modalWindow.querySelector('#title');
  const newTodoTextarea = modalWindow.querySelector('#text');
  newTodoInputTitle.value = '';
  newTodoTextarea.value = '';
  modalWindow.showModal();
}

function closeDialog() {
  modalWindow.close();
}
function saveTodosToLocalStorage() {
  localStorage.removeItem('todos');
  localStorage.setItem('todos', JSON.stringify(todos));
}


function saveToLocalStorage() {
  event.preventDefault();
  const newTodoInputTitle = modalWindow.querySelector('#title');
  const newTodoTextarea = modalWindow.querySelector('#text');

  if (isEditing) {
    const editedTodo = todos.find(todo => todo.id === editingTodoId);
    if (editedTodo) {
      editedTodo.title = newTodoInputTitle.value.trim();
      editedTodo.text = newTodoTextarea.value.trim();
    }
  } else {
    addTodo(newTodoInputTitle, newTodoTextarea);
  }

  saveTodosToLocalStorage();

  modalWindow.close();
  renderTodos();
  isEditing = false;
}

function addTodo(newTodoInputTitle, newTodoTextarea) {
  const newTodoTitle = newTodoInputTitle.value.trim();
  const newTodoText = newTodoTextarea.value.trim();
  if (newTodoTitle || newTodoText) {
    const newTodo = { id: liItem++, checked: false, title: newTodoTitle, text: newTodoText };
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    newTodoInputTitle.value = '';
    newTodoTextarea.value = '';
    renderTodos();
  }
}


function renderTodos(filteredTodos = todos) {
  const todoList = document.getElementById('todo_list');
  todoList.textContent = '';

  filteredTodos.forEach((todo) => {

    const listItemTemplate = document.getElementById('todo_item');
    const listItem = listItemTemplate.content.firstElementChild.cloneNode(true);

    listItem.dataset.id = todo.id;

    const todoTitle = listItem.querySelector('.title');
    todoTitle.textContent = todo.title;

    const todoText = listItem.querySelector('.text');
    todoText.textContent = todo.text;

    const checkbox = listItem.querySelector('.item_check');
    checkbox.checked = todo.checked;
    console.log(checkbox.checked);
    checkbox.addEventListener('change', (event) => toggleTodoStatus(event, listItem));

    listItem.querySelector('.remove').addEventListener('click', () => removeTodo(todo.id));
    listItem.querySelector('.edit').addEventListener('click', () => editTodo(todo.id, todoTitle, todoText));

    listItem.classList.toggle('completed', todo.checked);

    todoList.appendChild(listItem);
  });
}

function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
  saveToLocalStorage();
}

function editTodo(id, todoTitle, todoText) {
  isEditing = true;
  editingTodoId = id;

  const modalTitleInput = modalWindow.querySelector('#title');
  const modalTextInput = modalWindow.querySelector('#text');
  modalTitleInput.value = todoTitle.textContent;
  modalTextInput.value = todoText.textContent;

  modalWindow.showModal();
  buttonSaveDialog.removeEventListener('click', saveToLocalStorage);
  buttonSaveDialog.addEventListener('click', saveToLocalStorage);
}

function toggleTodoStatus(event, listItem) {
  const id = listItem.dataset.id;
  todos = todos.map((todo) => (String(todo.id) === id ? { ...todo, checked: !todo.checked } : todo));
  saveToLocalStorage();
  // renderTodos();
}

function filterTodos(filter) {
  let filteredTodos;

  if (filter.classList.contains('completed')) {
    filteredTodos = todos.filter((todo) => todo.checked);
  } else if (filter.classList.contains('all')) {
    filteredTodos = todos;
  } else if (filter.classList.contains('uncompleted')) {
    filteredTodos = todos.filter((todo) => !todo.checked);
  }

  return filteredTodos;
}

renderTodos();


