//select DOM elements
const input = document.getElementById('todo-ip')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

//load saved to dos from local storage(if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    //save current todos array to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

//create  a dom node for a todo object and append it to the list
function CreateTodoNode(todo, index) {
    const li = document.createElement('li');

    //checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration = todo.completed ? "line-through" : "";

        //TODO : visual feedback: strike-through when completed
        saveTodos();
    })

    //text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if (todo.completed) {
        textSpan.style.textDecoration = todo.completed;
    }
        //add double-click event listener to edit todo
        document.addEventListener("dblclick", () => {
            const newText = prompt("Edit Todo", todo.text);
            if (newText != null) {
                todo.text = newText.trim()
                textSpan.textContent = todo.text;
                saveTodos();
            }
        })

        //delete todo button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            render();
            saveTodos();
        })

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);
        return li
    }

//Render the whole todo list from todos array
function render() {
    list.innerHTML = '';

    //recreate each item
    todos.forEach((todo, index) => {
        const node = CreateTodoNode(todo, index);
        list.appendChild(node)
    });
}

function addToDo() {
    const text = input.value.trim();
    if (!text) {
        return
    }

    //push a new todo
    todos.push({ text, completed: false });
    input.value = '';
    render()
    saveTodos()
}

addBtn.addEventListener("click", addToDo);
input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        addToDo();
    }
})
render();