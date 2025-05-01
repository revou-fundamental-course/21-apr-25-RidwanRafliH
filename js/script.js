document.addEventListener('DOMContentLoaded', function() {
    const celsiusInput = document.getElementById('celsius');
    const fahrenheitInput = document.getElementById('fahrenheit');
    const calculationTextarea = document.getElementById('calculation');
    const convertBtn = document.getElementById('convert-btn');
    const resetBtn = document.getElementById('reset-btn');
    const reverseBtn = document.getElementById('reverse-btn');
    const celsiusLabel = document.querySelector('label[for="celsius"]');
    const fahrenheitLabel = document.querySelector('label[for="fahrenheit"]');

    let isCelsiusToFahrenheit = true; 

    function convertCelsiusToFahrenheit() {
        const celsius = parseFloat(celsiusInput.value); 

        if (isNaN(celsius)) {
            fahrenheitInput.value = '';
            calculationTextarea.value = 'Masukkan angka yang valid di kolom Celsius.';
            return;
        }

        const fahrenheit = (celsius * 9/5) + 32;

        fahrenheitInput.value = fahrenheit.toFixed(2); 
        calculationTextarea.value = `${celsius}°C * (9/5) + 32 = ${fahrenheit.toFixed(2)}°F`;
    }

    function convertFahrenheitToCelsius() {
        const fahrenheit = parseFloat(fahrenheitInput.value);

        if (isNaN(fahrenheit)) {
             celsiusInput.value = '';
             calculationTextarea.value = 'Masukkan angka yang valid di kolom Fahrenheit.';
            return;
        }

        const celsius = (fahrenheit - 32) * 5/9;
        celsiusInput.value = celsius.toFixed(2); 
         calculationTextarea.value = `(${fahrenheit}°F - 32) * 5/9 = ${celsius.toFixed(2)}°C`;
    }

    convertBtn.addEventListener('click', function() {
        if (isCelsiusToFahrenheit) {
            convertCelsiusToFahrenheit();
        } else {
            convertFahrenheitToCelsius();
        }
    });

    resetBtn.addEventListener('click', function() {
        celsiusInput.value = '';
        fahrenheitInput.value = '';
        calculationTextarea.value = '';

        if (!isCelsiusToFahrenheit) {
            reverseFields(); 
        }
        isCelsiusToFahrenheit = true;
    });

    function reverseFields() {
        const tempLabelText = celsiusLabel.textContent;
        celsiusLabel.textContent = fahrenheitLabel.textContent;
        fahrenheitLabel.textContent = tempLabelText;

        const tempCelsiusId = celsiusInput.id;
        celsiusInput.id = fahrenheitInput.id;
        fahrenheitInput.id = tempCelsiusId;

        const tempReadonly = celsiusInput.readOnly;
        celsiusInput.readOnly = fahrenheitInput.readOnly;
        fahrenheitInput.readOnly = tempReadonly;

        const tempPlaceholder = celsiusInput.placeholder;
        celsiusInput.placeholder = fahrenheitInput.placeholder;
        fahrenheitInput.placeholder = tempPlaceholder;

        celsiusInput.value = '';
        fahrenheitInput.value = '';
        calculationTextarea.value = '';

        isCelsiusToFahrenheit = !isCelsiusToFahrenheit;

        if(isCelsiusToFahrenheit) {
            celsiusInput.focus();
        } else {
            fahrenheitInput.focus();
        }
    }
    reverseBtn.addEventListener('click', function() {
        reverseFields();
    });

    celsiusInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && isCelsiusToFahrenheit) {
            event.preventDefault();
            convertCelsiusToFahrenheit();
        }
    });

     fahrenheitInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !isCelsiusToFahrenheit) {
            event.preventDefault();
            convertFahrenheitToCelsius();
        }
    });


     celsiusInput.focus();
});