// 1. Добавляем логику смены темы в самое начало
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    // Переключаем класс dark-theme у тега body
    document.body.classList.toggle('dark-theme');
    
    // Меняем текст на кнопке в зависимости от темы
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.innerText = 'Светлая тема';
    } else {
        themeToggle.innerText = 'Сменить тему';
    }
});

// 2. Твой основной код калькулятора с дополнениями
const display = document.getElementById('visa-display');
const fromCurr = document.getElementById('from-currency');
const toCurr = document.getElementById('to-currency');

let currentInput = "";
let previousValue = 0;
let operator = null;
let shouldResetScreen = false;

const rates = {
    "RUB": 1, "USD": 92.45, "EUR": 100.10, "GBP": 116.30, "CNY": 12.75
};
const symbols = {"RUB": "₽", "USD": "$", "EUR": "€", "GBP": "£", "CNY": "¥"};

const calculateVisaEquivalent = () => {
    let amount = parseFloat(currentInput || display.innerText.replace(/[^\d.-]/g, ''));
    if (isNaN(amount)) return;
    const result = (amount * rates[fromCurr.value]) / rates[toCurr.value];
    display.innerText = result.toFixed(2) + " " + symbols[toCurr.value];
    currentInput = result.toString(); 
    shouldResetScreen = true; 
};

document.querySelectorAll('.calc-btn').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;
        const text = button.innerText;

        // Ввод цифр и точки
        if (id.startsWith('digit_') || id === 'op_dot') {
            if (display.innerText === "0" || shouldResetScreen) {
                currentInput = "";
                shouldResetScreen = false;
            }
            if (text === "." && currentInput.includes(".")) return;
            currentInput += text;
            display.innerText = currentInput;
        } 
        // Очистка (C)
        else if (id === 'op_clear') {
            currentInput = ""; 
            previousValue = 0; 
            operator = null;
            display.innerText = "0";
        } 
        // Смена знака (+/-) — ДОБАВЛЕНО
        else if (id === 'op_revoke') {
            if (display.innerText === "0") return;
            currentInput = (parseFloat(display.innerText) * -1).toString();
            display.innerText = currentInput;
        }
        // Процент (%) — ДОБАВЛЕНО
        else if (id === 'op_rate') {
            if (display.innerText === "0") return;
            currentInput = (parseFloat(display.innerText) / 100).toString();
            display.innerText = currentInput;
        }
        // Конвертация валют
        else if (id === 'op_budget') {
            calculateVisaEquivalent();
        } 
        // Равно (=)
        else if (id === 'op_report') {
            if (operator && currentInput !== "") {
                let second = parseFloat(currentInput);
                let res = 0;
                if (operator === '+') res = previousValue + second;
                if (operator === '-') res = previousValue - second;
                if (operator === 'x') res = previousValue * second;
                if (operator === '/') res = second !== 0 ? previousValue / second : "Err";
                
                display.innerText = res;
                currentInput = res.toString();
                operator = null;
                shouldResetScreen = true;
            }
        } 
        // Операции (+, -, x, /)
        else if (button.classList.contains('primary')) {
            previousValue = parseFloat(display.innerText);
            operator = text;
            shouldResetScreen = true; // Чтобы после нажатия оператора ввод цифр начинался заново
        }
    });
});