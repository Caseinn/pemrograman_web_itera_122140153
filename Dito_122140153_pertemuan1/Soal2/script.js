

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
