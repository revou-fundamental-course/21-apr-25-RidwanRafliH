document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen-elemen dari HTML
    const celsiusInput = document.getElementById('celsius');
    const fahrenheitInput = document.getElementById('fahrenheit');
    const calculationTextarea = document.getElementById('calculation');
    const convertBtn = document.getElementById('convert-btn');
    const resetBtn = document.getElementById('reset-btn');
    const reverseBtn = document.getElementById('reverse-btn');
    const celsiusLabel = document.querySelector('label[for="celsius"]');
    const fahrenheitLabel = document.querySelector('label[for="fahrenheit"]');

    let isCelsiusToFahrenheit = true; // State untuk menentukan mode konversi

    // Fungsi untuk mengkonversi Celsius ke Fahrenheit
    function convertCelsiusToFahrenheit() {
        const celsius = parseFloat(celsiusInput.value); // Ambil nilai dari input Celsius

        // Cek apakah input valid (angka)
        if (isNaN(celsius)) {
            fahrenheitInput.value = '';
            calculationTextarea.value = 'Masukkan angka yang valid di kolom Celsius.';
            return;
        }

        // Lakukan perhitungan
        const fahrenheit = (celsius * 9/5) + 32;

        // Tampilkan hasil dan cara kalkulasi
        fahrenheitInput.value = fahrenheit.toFixed(2); // Tampilkan 2 angka di belakang koma
        calculationTextarea.value = `${celsius}°C * (9/5) + 32 = ${fahrenheit.toFixed(2)}°F`;
    }

    // Fungsi untuk mengkonversi Fahrenheit ke Celsius
    function convertFahrenheitToCelsius() {
        const fahrenheit = parseFloat(fahrenheitInput.value); // Ambil nilai dari input Fahrenheit

        // Cek apakah input valid (angka)
        if (isNaN(fahrenheit)) {
             celsiusInput.value = '';
             calculationTextarea.value = 'Masukkan angka yang valid di kolom Fahrenheit.';
            return;
        }

        // Lakukan perhitungan
        const celsius = (fahrenheit - 32) * 5/9;

        // Tampilkan hasil dan cara kalkulasi
        celsiusInput.value = celsius.toFixed(2); // Tampilkan 2 angka di belakang koma
         calculationTextarea.value = `(${fahrenheit}°F - 32) * 5/9 = ${celsius.toFixed(2)}°C`;
    }

    // Fungsi untuk menangani tombol Konversi
    convertBtn.addEventListener('click', function() {
        if (isCelsiusToFahrenheit) {
            convertCelsiusToFahrenheit();
        } else {
            convertFahrenheitToCelsius();
        }
    });

    // Fungsi untuk menangani tombol Reset
    resetBtn.addEventListener('click', function() {
        celsiusInput.value = '';
        fahrenheitInput.value = '';
        calculationTextarea.value = '';
        // Kembalikan ke mode default C ke F saat reset
        if (!isCelsiusToFahrenheit) {
            reverseFields(); // Panggil fungsi reverse untuk mengembalikan posisi input/output
        }
         // Pastikan nilai isCelsiusToFahrenheit benar setelah reverse (reverseFields akan mengaturnya)
         // Atau set manual jika reverseFields tidak mengaturnya secara langsung
        isCelsiusToFahrenheit = true;
    });

    // Fungsi untuk menukar field input dan output (Reverse)
    function reverseFields() {
        // Tukar label
        const tempLabelText = celsiusLabel.textContent;
        celsiusLabel.textContent = fahrenheitLabel.textContent;
        fahrenheitLabel.textContent = tempLabelText;

        // Tukar ID input (penting untuk label for) dan atribut readonly
        const tempCelsiusId = celsiusInput.id;
        celsiusInput.id = fahrenheitInput.id;
        fahrenheitInput.id = tempCelsiusId;

        // Tukar atribut readonly
        const tempReadonly = celsiusInput.readOnly;
        celsiusInput.readOnly = fahrenheitInput.readOnly;
        fahrenheitInput.readOnly = tempReadonly;

         // Tukar placeholder (opsional, tapi membantu kejelasan)
        const tempPlaceholder = celsiusInput.placeholder;
        celsiusInput.placeholder = fahrenheitInput.placeholder;
        fahrenheitInput.placeholder = tempPlaceholder;

        // Bersihkan nilai saat melakukan reverse karena input sudah berubah
        celsiusInput.value = '';
        fahrenheitInput.value = '';
        calculationTextarea.value = '';

        // Ubah state mode konversi
        isCelsiusToFahrenheit = !isCelsiusToFahrenheit;

         // Atur fokus ke input yang sekarang aktif
        if(isCelsiusToFahrenheit) {
            celsiusInput.focus();
        } else {
            fahrenheitInput.focus();
        }
    }

    // Fungsi untuk menangani tombol Reverse
    reverseBtn.addEventListener('click', function() {
        reverseFields();
    });

    // Event listener untuk input field agar bisa langsung konversi saat Enter ditekan
    celsiusInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && isCelsiusToFahrenheit) {
            event.preventDefault(); // Mencegah submit form jika ada
            convertCelsiusToFahrenheit();
        }
    });

     fahrenheitInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !isCelsiusToFahrenheit) {
            event.preventDefault(); // Mencegah submit form jika ada
            convertFahrenheitToCelsius();
        }
    });

     // Set fokus awal ke input Celsius
     celsiusInput.focus();
});