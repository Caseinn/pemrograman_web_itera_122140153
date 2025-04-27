from dataclasses import dataclass, asdict
from typing import List

BOBOT_UTS   = 0.30
BOBOT_UAS   = 0.40
BOBOT_TUGAS = 0.30

@dataclass
class Mahasiswa:
    nama: str
    nim: str
    uts: float
    uas: float
    tugas: float
    nilai_akhir: float = 0.0
    grade: str        = ""

    def hitung_nilai_akhir(self) -> None:
        self.nilai_akhir = round(
            BOBOT_UTS * self.uts +
            BOBOT_UAS * self.uas +
            BOBOT_TUGAS * self.tugas, 2)
        self.grade = self.tentukan_grade(self.nilai_akhir)

    @staticmethod
    def tentukan_grade(na: float) -> str:
        if na >= 80: return "A"
        if na >= 70: return "B"
        if na >= 60: return "C"
        if na >= 50: return "D"
        return "E"

def minta_float(prompt: str) -> float:
    """Minta input float 0-100, ulangi sampai valid."""
    while True:
        try:
            nilai = float(input(prompt))
            if 0 <= nilai <= 100:
                return nilai
            print("  Nilai harus 0–100.")
        except ValueError:
            print("  Input harus angka.")

def baca_data_mahasiswa(jumlah: int) -> List[Mahasiswa]:
    data = []
    while len(data) < jumlah:
        idx = len(data) + 1
        print(f"\nData mahasiswa ke-{idx}")
        nama = input("  Nama            : ").strip()
        nim  = input("  NIM             : ").strip()
        uts   = minta_float("  Nilai UTS       : ")
        uas   = minta_float("  Nilai UAS       : ")
        tugas = minta_float("  Nilai Tugas     : ")
        data.append(Mahasiswa(nama, nim, uts, uas, tugas))
    return data

def tampilkan_tabel(mahasiswa: List[Mahasiswa]) -> None:
    lebar_nama = max(len(m.nama) for m in mahasiswa) + 2
    print("\n" + "="*78)
    print(f"{'NIM':<12}{'Nama':<{lebar_nama}}{'UTS':>6}{'UAS':>6}{'Tugas':>8}"
          f"{'Nilai Akhir':>14}{'Grade':>8}")
    print("="*78)
    for m in mahasiswa:
        print(f"{m.nim:<12}{m.nama:<{lebar_nama}}{m.uts:>6.1f}{m.uas:>6.1f}"
              f"{m.tugas:>8.1f}{m.nilai_akhir:>14.2f}{m.grade:>8}")
    print("="*78)

def main() -> None:
    try:
        n = int(input("Masukkan jumlah mahasiswa: "))
        if n < 1:
            raise ValueError
    except ValueError:
        print("Jumlah harus bilangan bulat positif.")
        return

    mahasiswa = baca_data_mahasiswa(n)

    for m in mahasiswa:
        m.hitung_nilai_akhir()

    tampilkan_tabel(mahasiswa)

    tertinggi = max(mahasiswa, key=lambda x: x.nilai_akhir)
    terendah  = min(mahasiswa, key=lambda x: x.nilai_akhir)

    print(f"\nNilai tertinggi : {tertinggi.nama} ({tertinggi.nilai_akhir})")
    print(f"Nilai terendah  : {terendah.nama} ({terendah.nilai_akhir})")

if __name__ == "__main__":
    main()
