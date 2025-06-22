const table = document.querySelector("#studentTable tbody");
let studentData = {};

// ✅ Show toast
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerText = message;

  if (type === "error") {
    toast.style.backgroundColor = "#dc3545";
    toast.style.color = "#fff";
  } else if (type === "warning") {
    toast.style.backgroundColor = "#ffc107";
    toast.style.color = "#333";
  } else {
    toast.style.backgroundColor = "#28a745";
    toast.style.color = "#fff";
  }

  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ✅ Save to localStorage
function saveToStorage() {
  localStorage.setItem("students", JSON.stringify(studentData));
}

// ✅ Load from localStorage
function loadFromStorage() {
  const stored = localStorage.getItem("students");
  if (stored) {
    studentData = JSON.parse(stored);
  }
}

// ✅ Render table
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

// ✅ Add student
function addStudent() {
  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("id").value.trim();
  const marks = document.getElementById("marks").value.trim();

  if (!name || !id || !marks) {
    showToast("All fields are required.", "warning");
    return;
  }

  if (!/^\d+$/.test(id)) {
    showToast("ID must be a number only.", "warning");
    return;
  }

  if (isNaN(marks) || marks < 0 || marks > 100) {
    showToast("Marks must be 0–100.", "warning");
    return;
  }

  if (studentData[id]) {
    showToast("ID already exists.", "error");
    return;
  }

  studentData[id] = { name, marks };
  saveToStorage();
  renderTable();
  showToast("Student added!");

  document.getElementById("name").value = '';
  document.getElementById("id").value = '';
  document.getElementById("marks").value = '';
}

// ✅ Open popup
function openPopup() {
  const id = document.getElementById("modId").value.trim();

  if (!/^\d+$/.test(id)) {
    showToast("ID must be a number only.", "warning");
    return;
  }

  if (!studentData[id]) {
    showToast("ID not found.", "error");
    return;
  }

  document.getElementById("popupName").value = studentData[id].name;
  document.getElementById("popupMarks").value = studentData[id].marks;
  document.getElementById("popup").style.display = "block";
}

// ✅ Update student
function updateStudent() {
  const id = document.getElementById("modId").value.trim();
  const newName = document.getElementById("popupName").value.trim();
  const newMarks = document.getElementById("popupMarks").value.trim();

  if (!newName || !newMarks) {
    showToast("All fields are required.", "warning");
    return;
  }

  if (isNaN(newMarks) || newMarks < 0 || newMarks > 100) {
    showToast("Marks must be 0–100.", "warning");
    return;
  }

  studentData[id] = { name: newName, marks: newMarks };
  saveToStorage();
  renderTable();
  showToast("Student updated!");

  // ✅ Re-hide popup
  document.getElementById("popup").style.display = "none";

  // ✅ Reset popup form so next time it's clean
  document.getElementById("popupName").value = '';
  document.getElementById("popupMarks").value = '';
}

// ✅ On page load
window.onload = function () {
  loadFromStorage();
  renderTable();
};
