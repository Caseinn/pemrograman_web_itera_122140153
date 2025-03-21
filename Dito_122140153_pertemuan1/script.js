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

// 2. Modifikasi kalkulator pada langkah 5 untuk mendukung operasi matematika tambahan seperti pangkat, akar kuadrat, dan modulus.
function hitungKalkulator(angka1, angka2, operasi) {
    switch (operasi) {
        case "tambah": return angka1 + angka2;
        case "kurang": return angka1 - angka2;
        case "kali": return angka1 * angka2;
        case "bagi": return angka2 === 0 ? "Error: Pembagian dengan nol tidak diperbolehkan" : angka1 / angka2;
        case "pangkat": return Math.pow(angka1, angka2);
        case "akar": return angka1 < 0 ? "Error: Tidak bisa menghitung akar kuadrat dari angka negatif" : Math.sqrt(angka1);
        case "modulus": return angka1 % angka2;
        default: return "Operasi tidak valid";
    }
}

function handleClick(operasi, simbol) {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
    let hasil;
    
    if (isNaN(angka1)) {
        document.getElementById("hasil-kalkulator").innerHTML = '<p class="text-red-500">Masukkan angka yang valid!</p>';
        return;
    }
    
    if (operasi === "akar") {
        hasil = hitungKalkulator(angka1, null, operasi);
        document.getElementById("hasil-kalkulator").innerHTML = `<p>Hasil: ${simbol}${angka1} = ${hasil}</p>`;
    } else {
        if (isNaN(angka2)) {
            document.getElementById("hasil-kalkulator").innerHTML = '<p class="text-red-500">Masukkan angka yang valid!</p>';
            return;
        }
        hasil = hitungKalkulator(angka1, angka2, operasi);
        document.getElementById("hasil-kalkulator").innerHTML = `<p>Hasil: ${angka1} ${simbol} ${angka2} = ${hasil}</p>`;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn-tambah").addEventListener("click", () => handleClick("tambah", "+"));
    document.getElementById("btn-kurang").addEventListener("click", () => handleClick("kurang", "-"));
    document.getElementById("btn-kali").addEventListener("click", () => handleClick("kali", "×"));
    document.getElementById("btn-bagi").addEventListener("click", () => handleClick("bagi", "÷"));
    document.getElementById("btn-pangkat").addEventListener("click", () => handleClick("pangkat", "^"));
    document.getElementById("btn-akar").addEventListener("click", () => handleClick("akar", "√"));
    document.getElementById("btn-modulus").addEventListener("click", () => handleClick("modulus", "%"));

    document.getElementById("btn-reset").addEventListener("click", () => {
        document.getElementById("angka1").value = "";
        document.getElementById("angka2").value = "";
        document.getElementById("hasil-kalkulator").innerHTML = "";
    });
});


// 3. Buatlah sebuah fungsi untuk memvalidasi form input dengan kriteria:
// Nama harus lebih dari 3 karakter
// Email harus valid
// Password harus minimal 8 karakter

document.getElementById("validation-form").addEventListener("submit", function(event) {
    event.preventDefault();

    if (validasiForm()) {
        alert("Form berhasil dikirim!");
        event.target.reset();
    }
});

document.querySelectorAll("#validation-form input").forEach(input => {
    input.addEventListener("input", validasiForm);
});

function validasiForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const validationMessage = document.getElementById("validation-message");

    validationMessage.textContent = "";
    validationMessage.classList.remove("text-green-500", "text-red-500"); // Hapus warna sebelumnya

    if (name.value.trim().length <= 3) {
        validationMessage.textContent = "Nama harus lebih dari 3 karakter";
        validationMessage.classList.add("text-red-500");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        validationMessage.textContent = "Email Tidak Valid";
        validationMessage.classList.add("text-red-500");
        return false;
    }

    if (password.value.trim().length < 8) {
        validationMessage.textContent = "Password harus minimal 8 karakter";
        validationMessage.classList.add("text-red-500");
        return false;
    }

    validationMessage.textContent = "Form valid!";
    validationMessage.classList.add("text-green-500");

    return true; 
}
