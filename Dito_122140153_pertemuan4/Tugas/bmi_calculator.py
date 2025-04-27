try:
    berat = float(input("Masukkan berat badan (kg)  : "))
    tinggi = float(input("Masukkan tinggi badan (m atau cm): "))
except ValueError:
    print("Input harus angka.")
    quit()

if tinggi > 10: 
    tinggi /= 100

if berat <= 0 or tinggi <= 0:
    print("Berat & tinggi harus > 0.")
    quit()

bmi = berat / (tinggi ** 2)

if bmi < 18.5:
    kategori = "Berat badan kurang"
elif bmi < 25:
    kategori = "Berat badan normal"
elif bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

print(f"\nBMI Anda : {bmi:.2f}")
print(f"Kategori : {kategori}")
