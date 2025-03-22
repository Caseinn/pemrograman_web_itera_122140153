// 1. Buatlah aplikasi to-do list sederhana. Style tampilan tidak menjadi penilaian, fokus utama pada fungsionalitas JavaScript, dengan kriteria:
// Menambahkan item baru
// Menandai item sebagai selesai
// Menghapus item
// Menyimpan data ke localStorage

class TodoApp {
    constructor() {
        this.todoList = JSON.parse(localStorage.getItem("todos")) || [];
        this.render();
    }

    addTodo(task) {
        if (task.trim().length === 0) return;
        this.todoList.push({ task, completed: false });
        this.updateStorage();
    }

    toggleComplete(index) {
        this.todoList[index].completed = !this.todoList[index].completed;
        this.updateStorage();
    }

    deleteTodo(index) {
        this.todoList.splice(index, 1);
        this.updateStorage();
    }

    updateStorage() {
        localStorage.setItem("todos", JSON.stringify(this.todoList));
        this.render();
    }

    render() {
        const listElement = document.getElementById("todo-list");
        listElement.innerHTML = "";

        this.todoList.forEach((todo, index) => {
            const li = document.createElement("li");
            li.className = "flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition";

            li.innerHTML = `
                <div class="flex items-center gap-3">
                    <input type="checkbox" id="todo-${index}" ${todo.completed ? "checked" : ""} 
                        class="w-5 h-5 accent-blue-500 cursor-pointer"
                        onchange="app.toggleComplete(${index})">
                    <label for="todo-${index}" class="text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-black'}">
                        ${todo.task}
                    </label>
                </div>
                <button class="text-red-500 hover:text-red-700 text-xl transition" onclick="app.deleteTodo(${index})">
                    ❌
                </button>
            `;

            listElement.appendChild(li);
        });
    }
}

const app = new TodoApp();

document.getElementById("todo-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const taskInput = document.getElementById("task-input");
    app.addTodo(taskInput.value);
    taskInput.value = "";
});