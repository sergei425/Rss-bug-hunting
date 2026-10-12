const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value;
  errorEl.hidden = true;
  let task;
  if (text.trim()) {
    task = { id: nextId++, text: text, done: false };
    tasks.push(task);
  } else {
    errorEl.hidden = false;
  }
  input.value = "";
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  task.done = !task.done;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

function clearCompleted() {
  tasks = tasks.filter((el) => !el.done);
  render();
}

function getVisibleTasks() {
  let allTasks = tasks.slice()
  if (currentFilter === "active") {
    return tasks.slice().filter((el) => !el.done);
  } else if (currentFilter === "done") {
    return tasks.slice().filter((el) => el.done);
  } 
  return allTasks
}

function updateCounter() {
  counter.textContent = `Активных задач: ${tasks.filter((el) => !el.done).length}`;
}

function render(task = {}) {
  updateCounter();
  [...list.children].forEach((el) => el.remove());
  const visible = getVisibleTasks();

  for (let i = 0; i < visible.length; i++) {
    const { id, text, done } = visible[i];

    const li = document.createElement("li");
    li.className = "task";
    if (done) {
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = text;
    span.addEventListener("click", () => toggleTask(id));

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(id));

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;

    render();
  });
});

render();
