const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.innerText = 'Светлая тема';
    } else {
        themeToggle.innerText = 'Сменить тему';
    }
});

// --- Глобальные переменные и инициализация ---
const display = document.getElementById('visa-display');
const fromCurr = document.getElementById('from-currency');
const toCurr = document.getElementById('to-currency');

let currentInput = "";
let previousValue = 0;
let operator = null;
let shouldResetScreen = false;

const visaExchangeRates = {
    "RUB": 1, "USD": 92.45, "EUR": 100.10, "GBP": 116.30, "CNY": 12.75
};
const visaCurrencySymbols = {"RUB": "₽", "USD": "$", "EUR": "€", "GBP": "£", "CNY": "¥"};


const addApplications = (a, b) => a + b;           
const subtractDenials = (a, b) => a - b;           
const multiplyIssuedVisas = (a, b) => a * b;       
const divideByConsulates = (a, b) => b !== 0 ? a / b : "Err"; 

const calculateVisaEquivalent = () => {
    let amount = parseFloat(currentInput || display.innerText.replace(/[^\d.-]/g, ''));
    if (isNaN(amount)) return;
    const result = (amount * visaExchangeRates[fromCurr.value]) / visaExchangeRates[toCurr.value];
    display.innerText = result.toFixed(2) + " " + visaCurrencySymbols[toCurr.value];
    currentInput = result.toString(); 
    shouldResetScreen = true; 
};

document.querySelectorAll('.calc-btn').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;
        const text = button.innerText;

        if (id.startsWith('digit_') || id === 'op_dot') {
            if (display.innerText === "0" || shouldResetScreen) {
                currentInput = "";
                shouldResetScreen = false;
            }
            if (text === "." && currentInput.includes(".")) return;
            currentInput += text;
            display.innerText = currentInput;
        } 

        else if (id === 'op_clear') {
            currentInput = ""; 
            previousValue = 0; 
            operator = null;
            display.innerText = "0";
        } 

        else if (id === 'op_revoke') {
            if (display.innerText === "0") return;
            currentInput = (parseFloat(display.innerText) * -1).toString();
            display.innerText = currentInput;
        }

        else if (id === 'op_rate') {
            if (display.innerText === "0") return;
            currentInput = (parseFloat(display.innerText) / 100).toString();
            display.innerText = currentInput;
        }

        else if (id === 'op_budget') {
            calculateVisaEquivalent();
        } 

        else if (id === 'op_report') {
            if (operator && currentInput !== "") {
                let second = parseFloat(currentInput);
                let res = 0;
                
                if (operator === '+') res = addApplications(previousValue, second);
                if (operator === '-') res = subtractDenials(previousValue, second);
                if (operator === 'x') res = multiplyIssuedVisas(previousValue, second);
                if (operator === '/') res = divideByConsulates(previousValue, second);
                
                display.innerText = res;
                currentInput = res.toString();
                operator = null;
                shouldResetScreen = true;
            }
        } 

        else if (button.classList.contains('primary')) {
            previousValue = parseFloat(display.innerText);
            operator = text;
            shouldResetScreen = true; 
        }
    });
});