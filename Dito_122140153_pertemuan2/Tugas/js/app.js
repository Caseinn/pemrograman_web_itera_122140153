export class TaskManager {
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
  
    addTask(task) {
      task.id = Date.now(); 
      this.tasks.push(task);
      this.saveTasks();
    }
  
    getTasks() {
      return this.tasks;
    }
  
    getTaskById(id) {
      return this.tasks.find(task => task.id === id);
    }
  
    updateTask(id, updatedData) {
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedData };
        this.saveTasks();
      }
    }
  
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
    }
  
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
  