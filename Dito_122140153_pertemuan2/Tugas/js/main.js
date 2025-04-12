import { TaskManager } from './app.js';

const addTaskBtn = document.getElementById('add-task-btn');
const taskContainer = document.getElementById('task-container');

const taskModal = document.getElementById('taskModal');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskPriorityInput = document.getElementById('taskPriority');
const taskDueDateInput = document.getElementById('taskDueDate');
const submitTaskBtn = document.getElementById('submitTaskBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

const taskManager = new TaskManager();

const renderTasks = () => {
  taskContainer.innerHTML = ''; 
  const tasks = taskManager.getTasks();

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = `task-item ${task.priority}`;
    taskElement.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Due: ${task.dueDate}</p>
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskContainer.appendChild(taskElement);
  });
};

addTaskBtn.addEventListener('click', () => {
  taskModal.style.display = 'flex'; 
  clearModalInputs(); 
});

closeModalBtn.addEventListener('click', () => {
  taskModal.style.display = 'none'; 
  clearModalInputs();
});

const clearModalInputs = () => {
  taskTitleInput.value = '';
  taskDescriptionInput.value = '';
  taskPriorityInput.value = 'low';
  taskDueDateInput.value = '';
};

const handleTaskSubmit = (id = null) => {
  const title = taskTitleInput.value.trim();
  const description = taskDescriptionInput.value.trim();
  const priority = taskPriorityInput.value;
  const dueDate = taskDueDateInput.value;

  if (title === '') {
    alert('Please enter a valid title');
    return;
  }

  if (id) {
    taskManager.updateTask(id, { title, description, priority, dueDate });
  } else {
    taskManager.addTask({ title, description, priority, dueDate });
  }

  renderTasks();
  taskModal.style.display = 'none';
  clearModalInputs();
};

submitTaskBtn.addEventListener('click', () => {
  const taskId = taskTitleInput.dataset.taskId; 
  if (taskId) {
    handleTaskSubmit(taskId);
  } else {
    handleTaskSubmit();
  }
});

window.editTask = (id) => {
  const task = taskManager.getTaskById(id);
  if (task) {
    taskTitleInput.value = task.title;
    taskDescriptionInput.value = task.description;
    taskPriorityInput.value = task.priority;
    taskDueDateInput.value = task.dueDate;

    taskTitleInput.dataset.taskId = id;

    taskModal.style.display = 'flex';
  }
};

window.deleteTask = (id) => {
  taskManager.deleteTask(id);
  renderTasks();
};

renderTasks();
