// ---------------- NAVIGATION ----------------
const navButtons = document.querySelectorAll(".nav-btn");
const views = document.querySelectorAll(".view");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;

    views.forEach(v => v.classList.remove("active"));
    document.getElementById(view).classList.add("active");
  });
});

// ---------------- TASK MANAGER ----------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = t;
    li.addEventListener("click", () => {
      tasks.splice(i, 1);
      saveTasks();
    });
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

taskForm.addEventListener("submit", e => {
  e.preventDefault();
  if (taskInput.value.trim() === "") return;
  tasks.push(taskInput.value);
  taskInput.value = "";
  saveTasks();
});

renderTasks();

// ---------------- NOTES ----------------
let notes = JSON.parse(localStorage.getItem("notes")) || [];

const noteForm = document.getElementById("note-form");
const noteTitle = document.getElementById("note-title");
const noteBody = document.getElementById("note-body");
const notesContainer = document.getElementById("notes-container");

function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach(n => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `<h4>${n.title}</h4><p>${n.body}</p>`;
    notesContainer.appendChild(div);
  });
}

noteForm.addEventListener("submit", e => {
  e.preventDefault();
  if (!noteTitle.value && !noteBody.value) return;

  notes.push({
    title: noteTitle.value,
    body: noteBody.value
  });

  noteTitle.value = "";
  noteBody.value = "";

  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
});

renderNotes();

// ---------------- PLANNER ----------------
let planner = JSON.parse(localStorage.getItem("planner")) || [];

const plannerForm = document.getElementById("planner-form");
const plannerTime = document.getElementById("planner-time");
const plannerTask = document.getElementById("planner-task");
const plannerList = document.getElementById("planner-list");

function renderPlanner() {
  plannerList.innerHTML = "";
  planner
    .sort((a, b) => a.time.localeCompare(b.time))
    .forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.time} — ${p.task}`;
      plannerList.appendChild(li);
    });
}

plannerForm.addEventListener("submit", e => {
  e.preventDefault();
  if (!plannerTask.value) return;

  planner.push({
    time: plannerTime.value,
    task: plannerTask.value
  });

  plannerTask.value = "";
  localStorage.setItem("planner", JSON.stringify(planner));
  renderPlanner();
});

renderPlanner();

// ---------------- DASHBOARD ----------------
function updateStats() {
  const stats = document.getElementById("stats");
  stats.innerHTML = `
    <strong>Tasks:</strong> ${tasks.length}<br>
    <strong>Notes:</strong> ${notes.length}<br>
    <strong>Planner Entries:</strong> ${planner.length}
  `;
}

updateStats();

// ---------------- WIDGETS ----------------
document.getElementById("today").textContent =
  new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short"
  });
