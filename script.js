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
