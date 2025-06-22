const table = document.querySelector("#studentTable tbody");
let studentData = {};

function saveToStorage() {
  localStorage.setItem("students", JSON.stringify(studentData));
}

function loadFromStorage() {
  const stored = localStorage.getItem("students");
  if (stored) {
    studentData = JSON.parse(stored);
  }
}

function renderTable() {
  table.innerHTML = '';
  for (let id in studentData) {
    const { name, marks } = studentData[id];
    const row = table.insertRow();
    row.setAttribute("id", id);
    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = id;
    row.insertCell(2).innerText = marks;
  }
}

function addStudent() {
  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("id").value.trim();
  const marks = document.getElementById("marks").value.trim();

  if (!name || !id || !marks) return alert("All fields are required.");
  if (studentData[id]) return alert("ID already exists.");

  studentData[id] = { name, marks };
  saveToStorage();
  renderTable();

  // Clear input fields
  document.getElementById("name").value = '';
  document.getElementById("id").value = '';
  document.getElementById("marks").value = '';
}

function openPopup() {
  const id = document.getElementById("modId").value.trim();
  if (!studentData[id]) return alert("ID not found.");

  document.getElementById("popupName").value = studentData[id].name;
  document.getElementById("popupMarks").value = studentData[id].marks;
  document.getElementById("popup").style.display = "block";
}

function updateStudent() {
  const id = document.getElementById("modId").value.trim();
  const newName = document.getElementById("popupName").value.trim();
  const newMarks = document.getElementById("popupMarks").value.trim();

  if (!newName || !newMarks) return alert("All fields are required.");

  studentData[id] = { name: newName, marks: newMarks };
  saveToStorage();
  renderTable();

  document.getElementById("popup").style.display = "none";
}

// Ensure data is restored and table is rendered on page load
window.onload = function () {
  loadFromStorage();
  renderTable();
};
