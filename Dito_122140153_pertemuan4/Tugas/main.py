import math_operations as mo           

def menu():
    print("\n=== MENU MATEMATIKA SEDERHANA ===")
    print("1. Luas & Keliling Persegi")
    print("2. Luas & Keliling Persegi Panjang")
    print("3. Luas & Keliling Lingkaran")
    print("4. Konversi Suhu (Celsius → Fahrenheit / Kelvin)")
    print("5. Keluar")
    return input("Pilih menu [1-5]: ").strip()

def minta_float(prompt, positif=False):
    while True:
        try:
            x = float(input(prompt))
            if positif and x <= 0:
                print("  Nilai harus > 0.")
                continue
            return x
        except ValueError:
            print("  Input harus angka!")

def persegi():
    s = minta_float("Masukkan panjang sisi (m): ", positif=True)
    print("Luas       :", mo.luas_persegi(s))
    print("Keliling   :", mo.keliling_persegi(s))

def persegi_panjang():
    p = minta_float("Masukkan panjang (m): ", positif=True)
    l = minta_float("Masukkan lebar   (m): ", positif=True)
    print("Luas       :", mo.luas_persegi_panjang(p, l))
    print("Keliling   :", mo.keliling_persegi_panjang(p, l))

def lingkaran():
    r = minta_float("Masukkan jari-jari (m): ", positif=True)
    print("Luas       :", mo.luas_lingkaran(r))
    print("Keliling   :", mo.keliling_lingkaran(r))

def konversi_suhu():
    c = minta_float("Masukkan suhu (°C): ")
    print(f"{c} °C = {mo.c_to_f(c):.2f} °F")
    print(f"{c} °C = {mo.c_to_k(c):.2f} K")
    print("Nilai PI dari konstanta:", mo.PI)

def main():
    while True:
        pilihan = menu()
        if pilihan == "1":
            persegi()
        elif pilihan == "2":
            persegi_panjang()
        elif pilihan == "3":
            lingkaran()
        elif pilihan == "4":
            konversi_suhu()
        elif pilihan == "5":
            print("Program selesai. Terima kasih!")
            break
        else:
            print("Pilihan tidak valid. Coba lagi.")

if __name__ == "__main__":
    main()
