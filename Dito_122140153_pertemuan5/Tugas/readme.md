# 📚 Sistem Manajemen Perpustakaan (OOP Python)

Sistem ini merupakan implementasi sederhana dari manajemen perpustakaan menggunakan **Object-Oriented Programming (OOP)** dengan Python. Proyek ini mencakup penggunaan abstract class, inheritance, encapsulation, polymorphism, serta fitur interaktif berbasis menu CLI.

---

## ✅ Kriteria Penilaian

### 1. Penggunaan Abstract Class dan Inheritance

- `LibraryItem` adalah **abstract class** yang menjadi blueprint dasar bagi semua item perpustakaan.
- Class ini mendefinisikan atribut dasar seperti `title`, `item_id`, dan `available`, serta method abstrak `display_info()` yang wajib diimplementasikan oleh class turunannya.
- Terdapat dua **subclass**:
  - `Book` (mewakili buku)
  - `Magazine` (mewakili majalah)
- Keduanya mewarisi atribut dan method dari `LibraryItem` dan mengimplementasikan method `display_info()` sesuai dengan jenis item masing-masing.

### 2. Implementasi Encapsulation

- Atribut penting dilindungi menggunakan modifier:
  - `_title`, `_item_id`, `_available` → **protected**
  - `__collection` di dalam class `Library` → **private**
- Penggunaan `@property` dan `@available.setter` memungkinkan pengaturan status ketersediaan secara aman dan Pythonic.
- Koleksi item (`__collection`) hanya dapat diakses dari luar menggunakan method `get_collection()` untuk menjaga enkapsulasi.

### 3. Penerapan Polymorphism

- Method `display_info()` didefinisikan secara berbeda di masing-masing subclass (`Book`, `Magazine`).
- Saat `Library` memanggil method ini, sistem secara otomatis menjalankan versi yang sesuai dengan tipe objek — **polymorphism runtime (dynamic dispatch)**.
- Hal ini memudahkan penambahan jenis item baru tanpa perlu mengubah kode utama pengelolaan.

### 4. Fungsionalitas Program

Program mendukung fitur-fitur berikut:

- Menambahkan item baru (Buku atau Majalah)
- Menampilkan seluruh koleksi perpustakaan
- Mencari item berdasarkan judul atau ID
- Mengubah status ketersediaan item (tersedia/dipinjam)
- Antarmuka menu interaktif berbasis terminal

Semua fitur ditangani melalui fungsi `menu()` di bagian akhir kode.

---
