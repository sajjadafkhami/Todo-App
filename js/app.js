const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
//******************************************************
const alertMessage = document.getElementById("alert-message");
//********************************************************
const todosBody = document.querySelector("tbody");
//********************************************************
const deleteAllButton = document.getElementById("delete-all-button");
//********************************************************
const filterButtons = document.querySelectorAll(".filter-todos");
//********************************************************
const generateId = () => {
  const id = Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
  //console.log(id);
  return id;
};
//generateId()

//*********************************************************
const showAlert = (message, type) => {
  alertMessage.innerHTML = " ";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);

  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

//*********************************************************
const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//*********************************************************

//const todos = [];
let todos = JSON.parse(localStorage.getItem("todos")) || [];
//console.log(todos)

//***********************************************************
const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("All todos cleared successfuly", "success");
  } else {
    showAlert("No todos to clear!", "error");
  }
};

//*************************************************************
const filterHandler = (event) => {
  let filterdTodos = null;
  //console.log(event);
  const filter = event.target.dataset.filter;
  //console.log(filter);
  switch (filter) {
    case "pending":
      filterdTodos = todos.filter((todo) => todo.completed === false);
      break;
    case "completed":
      filterdTodos = todos.filter((todo) => todo.completed === true);
      break;
    default:
      filterdTodos = todos;
      break;
  }
  //console.log(filterdTodos);
  displayTodos(filterdTodos);
};
//*************************************************************
const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    task: task,
    date: date,
    completed: false,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    taskInput.value = " ";
    dateInput.value = " ";
    console.log(todos);
    showAlert("Todo added successfuly", "success");
  } else {
    //alert("Warning");
    showAlert("please enter a todo!", "error");
  }
};
//*****************************************************
const displayTodos = (data) => {
  //console.log(data)
  const todoList = data ? data : todos;
  //console.log(todoList)
  todosBody.innerHTML = "";
  if (todoList.length === 0) {
    todosBody.innerHTML = "<tr><td colspan='4'>No Task Found!</td></tr>";
    return;
  } //(!todos.length): "it is better for if"

  todoList.forEach((todo) => {
    todosBody.innerHTML += `
    <tr>
    <td>${todo.task}</td>
    <td>${todo.date ? todo.date : "No date"}</td> 
    <td>${todo.completed ? "completed" : "pending"}</td>

    <td>
    <button onclick="editHandler('${todo.id}')">Edit</button>
    <button onclick="toggleHandler('${todo.id}')">
    ${todo.completed ? "Undo" : "Do"}
    </button>
    <button onclick="deleteHandler('${todo.id}')">Delete</button>
    </td>
    </tr>`;
  });
};
//displayTodos();

//*****************************************************
const editHandler = (id) => {
  //console.log(id)
  const todo = todos.find((todo) => todo.id === id);
  //console.log(todo);
  taskInput.value = todo.task;
  dateInput.value = todo.date;
  addButton.style.display = "none";
  editButton.style.display = "block";
  editButton.dataset.id = id;
};

const applyEditHandler = (event) => {
  const id = event.target.dataset.id;
  const todo = todos.find((todo) => todo.id === id);
  todo.task = taskInput.value;
  todo.date = dateInput.value;
  addButton.style.display = "block";
  editButton.style.display = "none";
  taskInput.value = " ";
  dateInput.value = " ";
  saveToLocalStorage();
  displayTodos();
  showAlert("Todos Edited successfully", "success");
};

//*****************************************************

const toggleHandler = (id) => {
  //console.log(id);
  /*
    const editTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          id: todo.id,
          task: todo.task,
          date: todo.date,
          completed: !todo.completed,
        };
      } else {
        return todo;
      }
    });
     //console.log(editTodos);
     todos = editTodos;
    */
  const todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  console.log(todo);
  saveToLocalStorage();
  displayTodos();
  showAlert("Todos status changed successfully", "success");
};
//*****************************************************

const deleteHandler = (id) => {
  //console.log("id");
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo deleted successfully!", "success");
  //console.log(newTodos)
};

//*****************************************************
addButton.addEventListener("click", addHandler);
//*****************************************************
window.addEventListener("load", () => displayTodos());
//*****************************************************
deleteAllButton.addEventListener("click", deleteAllHandler);
//*****************************************************
editButton.addEventListener("click", applyEditHandler);
//*****************************************************
filterButtons.forEach((button) => {
  button.addEventListener("click", filterHandler);
});
