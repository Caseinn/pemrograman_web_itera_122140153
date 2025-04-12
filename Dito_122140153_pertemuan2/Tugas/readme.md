# Personal Dashboard - Task Manager

## Deskripsi Aplikasi

**Personal Dashboard** adalah aplikasi manajemen tugas yang memungkinkan pengguna untuk membuat, mengedit, dan menghapus tugas. Aplikasi ini dilengkapi dengan pengaturan prioritas tugas dan deadline. Semua data tugas disimpan di **localStorage** sehingga data tetap ada meskipun halaman di-refresh.

### Fitur Aplikasi:
1. **Tambah Tugas**: Menambahkan tugas baru dengan memasukkan judul, deskripsi, prioritas, dan deadline.
2. **Edit Tugas**: Mengedit tugas yang sudah ada, termasuk judul, deskripsi, prioritas, dan deadline.
3. **Hapus Tugas**: Menghapus tugas dari daftar.
4. **Prioritas Tugas**: Menetapkan prioritas tugas menjadi `Low`, `Medium`, atau `High`, dengan warna yang berbeda untuk setiap prioritas.
5. **Deadline**: Menetapkan deadline untuk setiap tugas.
6. **Penyimpanan Lokal**: Semua data tugas disimpan di **localStorage**, memastikan data tetap ada meskipun halaman di-refresh.

## Aplikasi

(https://caseinn.github.io/pemrograman_web_itera_122140153/Dito_122140153_pertemuan2/Tugas/)

## Fitur ES6+ yang Diimplementasikan

Aplikasi ini menggunakan fitur-fitur terbaru dari JavaScript untuk meningkatkan efisiensi, keterbacaan, dan pemeliharaan kode. Berikut fitur-fitur ES6+ yang diimplementasikan:

1. **Let dan Const**: Digunakan untuk mendeklarasikan variabel dengan **scoping** yang lebih tepat. `let` digunakan untuk variabel yang nilainya dapat berubah, sedangkan `const` digunakan untuk variabel yang nilainya tetap.
2. **Arrow Functions**: Fungsi dengan sintaks yang lebih ringkas dan efisien, serta perilaku `this` yang lebih konsisten.
   - Contoh: `const addTask = () => { ... }`
3. **Template Literals**: Mempermudah interpolasi string dan multi-baris tanpa menggunakan tanda `+`.
   - Contoh: `` `Task: ${taskTitle}` ``
4. **Destructuring**: Memudahkan ekstraksi nilai dari objek dan array.
   - Contoh: `const { title, description } = task;`
5. **Spread dan Rest Operators**: Memudahkan untuk menyalin atau menggabungkan objek dan array.
   - Contoh: `const newTask = { ...task, priority: 'high' };`
6. **Default Parameters**: Mengizinkan kita untuk memberikan nilai default pada parameter fungsi.
   - Contoh: `function greet(name = 'Guest') { ... }`
7. **Classes**: Penggunaan kelas untuk membuat dan mengelola objek, serta memanfaatkan fitur pewarisan.
   - Contoh: `class Task { ... }`
8. **Async/Await**: Aplikasi ini tidak menggunakan Async/Await karena jika menggunakan localstorage tidak perlu menghandle Async/Await
   - Contoh: 
   ```javascript
   const fetchData = async () => {
     const response = await fetch('url');
     const data = await response.json();
     return data;
   };
