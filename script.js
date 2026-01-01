var input = document.getElementById("todoInput");
var addBtn = document.getElementById("addBtn");
var todoList = document.getElementById("todoList");

var filters = document.getElementsByClassName("filter");
var deleteDoneBtn = document.getElementById("deleteDone");
var deleteAllBtn = document.getElementById("deleteAll");

var deleteModal = document.getElementById("deleteModal");
var confirmDeleteBtn = document.getElementById("confirmDelete");

var editModal = document.getElementById("editModal");
var editInput = document.getElementById("editInput");
var saveEditBtn = document.getElementById("saveEdit");

var todos = [];
var currentFilter = "all";
var deleteIndex = -1;
var editIndex = -1;

addBtn.onclick = function () {
  var text = input.value.trim();
  if (text === "") return;

  todos.push({ text: text, done: false });
  input.value = "";
  drawTasks();
};

function drawTasks() {
  todoList.innerHTML = "";

  for (var i = 0; i < todos.length; i++) {
    if (currentFilter === "done" && !todos[i].done) continue;
    if (currentFilter === "todo" && todos[i].done) continue;

    var li = document.createElement("li");
    li.className = "todo-item";
    if (todos[i].done) li.className += " done";
    var textSpan = document.createElement("span");
    textSpan.innerText = todos[i].text;
    var actions = document.createElement("div");

    var check = document.createElement("input");
    check.type = "checkbox";
    check.checked = todos[i].done;
    check.className = "check";
    check.setAttribute("data-index", i);

    var editBtn = document.createElement("button");
    editBtn.innerText = "✏";
    editBtn.className = "edit-btn";
    editBtn.setAttribute("data-index", i);

    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑";
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("data-index", i);

    actions.appendChild(check);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(textSpan);
    li.appendChild(actions);
    todoList.appendChild(li);
  }
}

todoList.onclick = function (e) {
  var t = e.target;

  if (t.classList.contains("edit-btn")) {
    editIndex = Number(t.getAttribute("data-index"));
    editInput.value = todos[editIndex].text;
    editModal.style.display = "block";
    return;
  }

  if (t.classList.contains("delete-btn")) {
    deleteIndex = Number(t.getAttribute("data-index"));
    deleteModal.style.display = "block";
    return;
  }
};

todoList.onchange = function (e) {
  var t = e.target;

  if (t.classList.contains("check")) {
    var idx = Number(t.getAttribute("data-index"));
    todos[idx].done = t.checked;
    drawTasks();
  }
};

for (var i = 0; i < filters.length; i++) {
  filters[i].onclick = function () {
    for (var j = 0; j < filters.length; j++) {
      filters[j].classList.remove("active");
    }

    this.classList.add("active");
    currentFilter = this.getAttribute("data-filter");
    drawTasks();
  };
}

confirmDeleteBtn.onclick = function () {
  if (deleteIndex > -1) {
    todos.splice(deleteIndex, 1);
  }
  closeDeleteModal();
  drawTasks();
};

function closeDeleteModal() {
  deleteModal.style.display = "none";
}

saveEditBtn.onclick = function () {
  var newText = editInput.value.trim();
  if (editIndex > -1 && newText !== "") {
    todos[editIndex].text = newText;
  }
  closeEditModal();
  drawTasks();
};

function closeEditModal() {
  editModal.style.display = "none";
}

deleteDoneBtn.onclick = function () {
  var newTodos = [];
  for (var i = 0; i < todos.length; i++) {
    if (!todos[i].done) newTodos.push(todos[i]);
  }
  todos = newTodos;
  drawTasks();
};

deleteAllBtn.onclick = function () {
  todos = [];
  drawTasks();
};
