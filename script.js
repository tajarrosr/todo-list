let todoList = JSON.parse(localStorage.getItem("todolist")) || [];

function reusetodoList() {
  let todoListHTML = "";

  todoList.forEach((todo, index) => {
    const { name, dueDate } = todo;
    const formatDate = new Date(dueDate).toLocaleDateString();

    const html = `
    <div class="todo-item">
    <span>${name} - Due: ${formatDate}</span>
    <button onclick="deletetodo(${index})">Delete</button>
    </div>
    `;
    todoListHTML += html;
  });

  document.querySelector(".js-todoList").innerHTML = todoListHTML;
}

function addTodo() {
  const name = document.querySelector(".todo-input").value;
  const dueDate = document.querySelector(".js-duedate-input").value;

  if (name && dueDate) {
    todoList.push({ name, dueDate });

    document.querySelector(".todo-input").value = "";
    document.querySelector(".js-duedate-input").value = "";

    updatelocalStorage();
    reusetodoList();
  } else {
    alert("Please fill in both fields.");
  }
}

function deletetodo(index) {
  todoList.splice(index, 1);

  updatelocalStorage();
  reusetodoList();
}

function updatelocalStorage() {
  localStorage.setItem("todolist", JSON.stringify(todoList));
}

reusetodoList();
