const table = document.querySelector("#studentTable tbody");
let studentData = {};

// Save to localStorage
function saveToStorage() {
  localStorage.setItem("students", JSON.stringify(studentData));
}

// Load from localStorage
function loadFromStorage() {
  const stored = localStorage.getItem("students");
  if (stored) {
    studentData = JSON.parse(stored);
  }
}

// Render the table
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

// Add student
function addStudent() {
  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("id").value.trim();
  const marks = document.getElementById("marks").value.trim();

  if (!name || !id || !marks) {
    alert("All fields are required.");
    return;
  }

  if (!/^\d+$/.test(id)) {
    alert("ID must be a number only.");
    return;
  }

  if (isNaN(marks) || marks < 0 || marks > 100) {
    alert("Marks must be between 0 and 100.");
    return;
  }

  if (studentData[id]) {
    alert("This ID already exists.");
    return;
  }

  studentData[id] = { name, marks };
  saveToStorage();
  renderTable();

  document.getElementById("name").value = '';
  document.getElementById("id").value = '';
  document.getElementById("marks").value = '';
}

// Open popup
function openPopup() {
  const id = document.getElementById("modId").value.trim();

  if (!/^\d+$/.test(id)) {
    alert("ID must be a number only.");
    return;
  }

  if (!studentData[id]) {
    alert("ID not found.");
    return;
  }

  document.getElementById("popupName").value = studentData[id].name;
  document.getElementById("popupMarks").value = studentData[id].marks;
  document.getElementById("popup").style.display = "block";
}

// Update student
function updateStudent() {
  const id = document.getElementById("modId").value.trim();
  const newName = document.getElementById("popupName").value.trim();
  const newMarks = document.getElementById("popupMarks").value.trim();

  if (!newName || !newMarks) {
    alert("All fields are required.");
    return;
  }

  if (isNaN(newMarks) || newMarks < 0 || newMarks > 100) {
    alert("Marks must be between 0 and 100.");
    return;
  }

  studentData[id] = { name: newName, marks: newMarks };
  saveToStorage();
  renderTable();

  // Close popup after update
  document.getElementById("popup").style.display = "none";
  document.getElementById("popupName").value = '';
  document.getElementById("popupMarks").value = '';
}

// On load
window.onload = function () {
  loadFromStorage();
  renderTable();
};
