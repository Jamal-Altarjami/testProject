const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToDOM(todo));
}

function saveTodos() {
    const todos = Array.from(list.children).map(item => item.firstChild.textContent);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodoToDOM(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);

    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.addEventListener('click', () => {
        li.remove();
        saveTodos();
    });
    li.appendChild(btn);

    list.appendChild(li);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
        addTodoToDOM(text);
        input.value = '';
        saveTodos();
    }
});

loadTodos();
