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
