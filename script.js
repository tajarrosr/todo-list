let todoList = JSON.parse(localStorage.getItem("todolist")) || [];

const todoInput = document.querySelector(".todo-input");
const dueDateInput = document.querySelector(".js-duedate-input");
const todoContainer = document.querySelector(".js-todoList");
const addButton = document.querySelector("button");

const rendertodoList = () => {
    todoContainer.innerHTML = "";

  todoList.forEach((todo, index) => {
    const { name, dueDate } = todo;
    const formatDate = new Date(dueDate).toLocaleDateString();

    const item = document.createElement("div")
    item.className = "todo-item";
    
    item.innerHTML = `
    <span>${name} - Due: ${formatDate}</span>
    <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    todoContainer.appendChild(item);
  });


  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", () => deleteTodo(button.dataset.index));
  });
};

const addTodo = () => {
  const name = todoInput.value.trim();
  const dueDate = dueDateInput.value;

  if (!name || !dueDate) {
    alert("Please fill in both fields.");
    return;
  }

  todoList.push({name, dueDate});
  updatelocalStorage();

  todoInput.value = "";
  dueDateInput.value = "";
  rendertodoList();
}

const deleteTodo = (index) => {
  todoList.splice(index, 1);
  updatelocalStorage();
  rendertodoList();
}

const updatelocalStorage = () => {
  localStorage.setItem("todolist", JSON.stringify(todoList));
}

addButton.addEventListener("click", addTodo);

rendertodoList();
