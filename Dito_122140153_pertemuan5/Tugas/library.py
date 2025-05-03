# library_item.py

from abc import ABC, abstractmethod

# Abstract Class
class LibraryItem(ABC):
    def __init__(self, title, item_id):
        self._title = title          # Protected attribute
        self._item_id = item_id      # Protected attribute
        self._available = True       # Protected attribute

    @abstractmethod
    def display_info(self):
        pass

    @property
    def title(self):
        return self._title

    @property
    def item_id(self):
        return self._item_id

    @property
    def available(self):
        return self._available

    @available.setter
    def available(self, status):
        if isinstance(status, bool):
            self._available = status
        else:
            raise ValueError("Availability must be a boolean")


# Subclass Book
class Book(LibraryItem):
    def __init__(self, title, item_id, author, pages):
        super().__init__(title, item_id)
        self.author = author
        self.pages = pages

    def display_info(self):
        status = "Tersedia" if self._available else "Dipinjam"
        print(f"[Buku] {self._title} - {self.author}, {self.pages} halaman (ID: {self._item_id}) [{status}]")


# Subclass Magazine
class Magazine(LibraryItem):
    def __init__(self, title, item_id, volume):
        super().__init__(title, item_id)
        self.volume = volume

    def display_info(self):
        status = "Tersedia" if self._available else "Dipinjam"
        print(f"[Majalah] {self._title} - Volume {self.volume} (ID: {self._item_id}) [{status}]")


# Class untuk mengelola koleksi
class Library:
    def __init__(self):
        self.__collection = []  # Private attribute

    def add_item(self, item: LibraryItem):
        self.__collection.append(item)
        print(f"Item '{item.title}' berhasil ditambahkan ke perpustakaan.")

    def show_all_items(self):
        if not self.__collection:
            print("Perpustakaan kosong.")
        else:
            for item in self.__collection:
                item.display_info()

    def search_item(self, keyword):
        found = False
        for item in self.__collection:
            if keyword.lower() in item.title.lower() or keyword.lower() in item.item_id.lower():
                item.display_info()
                found = True
        if not found:
            print("Item tidak ditemukan.")

    def get_collection(self):
        # Method tambahan untuk akses aman dari luar
        return self.__collection


# Menu Interaktif
def menu():
    perpustakaan = Library()

    while True:
        print("\n=== Menu Perpustakaan ===")
        print("1. Tambah Buku")
        print("2. Tambah Majalah")
        print("3. Lihat Semua Item")
        print("4. Cari Item")
        print("5. Ubah Status Ketersediaan")
        print("6. Keluar")

        choice = input("Pilih menu (1-6): ")

        if choice == "1":
            title = input("Judul Buku: ")
            item_id = input("ID Buku: ")
            author = input("Penulis: ")
            try:
                pages = int(input("Jumlah Halaman: "))
                buku = Book(title, item_id, author, pages)
                perpustakaan.add_item(buku)
            except ValueError:
                print("Jumlah halaman harus berupa angka.")

        elif choice == "2":
            title = input("Judul Majalah: ")
            item_id = input("ID Majalah: ")
            try:
                volume = int(input("Volume: "))
                majalah = Magazine(title, item_id, volume)
                perpustakaan.add_item(majalah)
            except ValueError:
                print("Volume harus berupa angka.")

        elif choice == "3":
            print("\nDaftar Koleksi:")
            perpustakaan.show_all_items()

        elif choice == "4":
            keyword = input("Masukkan judul atau ID: ")
            perpustakaan.search_item(keyword)

        elif choice == "5":
            keyword = input("Masukkan ID item yang akan diubah statusnya: ")
            found = False
            for item in perpustakaan.get_collection():
                if item.item_id.lower() == keyword.lower():
                    status = input("Apakah item sedang dipinjam? (y/n): ").lower()
                    if status == "y":
                        item.available = False
                        print("Status diubah menjadi: Dipinjam.")
                    elif status == "n":
                        item.available = True
                        print("Status diubah menjadi: Tersedia.")
                    else:
                        print("Input tidak valid. Gunakan 'y' atau 'n'.")
                    found = True
                    break
            if not found:
                print("Item tidak ditemukan.")

        elif choice == "6":
            print("Terima kasih telah menggunakan sistem perpustakaan.")
            break

        else:
            print("Pilihan tidak valid. Silakan coba lagi.")


if __name__ == "__main__":
    menu()
