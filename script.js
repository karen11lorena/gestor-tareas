//Obtiene referencias a los elementos del html 
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


//Guarda las tareas en localstorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList .task").forEach(li => {
    const span = li.querySelector("span");
    const completed = span.style.textDecoration === "line-through";//Verifica si esta tachada
    const date = li.getAttribute("data-date"); // recupera la fecha guardada
    tasks.push({ text: span.textContent, completed, date });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks)); //Guarda en almacenamiento
}

//Carga las tareas guardadas al abrir la pagina 
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed, task.date));
}

//Crea un nuevo elemento de tarea
function createTaskElement(taskText, completed = false, date = null) {
  const li = document.createElement("li");
  li.className = "task";

  // Si no hay fecha (tarea nueva), la generamos
  if (!date) {
    date = new Date().toLocaleString();  // Genera fecha si es nueva
  }
  li.setAttribute("data-date", date);

  const span = document.createElement("span");
  span.textContent = taskText;
  if (completed) {
    span.style.textDecoration = "line-through"; // Tachado si esta completada
    span.style.color = "gray";
  }

  const dateLabel = document.createElement("small");
  dateLabel.textContent = ` (${date})`; // Muestra la fecha
  dateLabel.style.marginLeft = "10px";
  dateLabel.style.color = "darkblue";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔️"; //Boton completar 
  completeBtn.onclick = () => {
    span.style.textDecoration = "line-through";
    span.style.color = "gray";
    saveTasks();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌"; //Boton eliminar
  deleteBtn.onclick = () => {
    taskList.removeChild(li);
    saveTasks();
  };

  //Añade todo a <li>
  li.appendChild(span);
  li.appendChild(dateLabel);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

//Añadir nueva tarea 
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return; //Evita tareas vacias
  createTaskElement(taskText);
  saveTasks();
  taskInput.value = ""; //Limpia la caja de texto
}

//Eventos: Click y Enter
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

//  Esto carga las tareas guardadas al abrir la página
loadTasks();
