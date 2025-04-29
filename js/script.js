document.addEventListener('DOMContentLoaded', () => { 
    const celsiusInput = document.getElementById('celcius');
    const fahrenheitInput = document.getElementById('fahrenheit');
    const calculationSteps = document.getElementById('calculation-steps');
    const convertBtn = document.getElementById('convert-btn');
    const resetBtn = document.getElementById('reset-btn');

    fahrenheitInput.setAttribute('readonly', true);

    convertBtn.addEventListener('click', () => {
        const celcius = parseFloat(celsiusInput.value);

        if (isNaN(celcius)) {
            fahrenheitInput.value = '';
            calculationSteps.value = 'Masukkan angka yang valid untuk dikonversi.';
            return;
        }

        const fahrenheit = (celcius * 9/5) + 32;

        fahrenheitInput.value = fahrenheit.toFixed(2);
        calculationSteps.value = `${celsius}°C * (9/5) + 32 = ${fahrenheit.toFixed(2)}°F`;
    });

    resetBtn.addEventListener('click', () => {
        celsiusInput.value = '';
        fahrenheitInput.value = '';
        calculationSteps.value = '';
    });
});