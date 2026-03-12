const display = document.getElementById('visa-display');
let currentInput = "";
let previousValue = 0;
let operator = null;

const addApplications = (a, b) => a + b;         
const subtractDenials = (a, b) => a - b;       
const multiplyIssuedVisas = (a, b) => a * b;     
const divideByConsulates = (a, b) => b !== 0 ? a / b : "Error"; 
const revokeVisas = (val) => val * -1;            
const getApprovalRate = (val) => val / 100;       

const calculateRequiredBudget = () => {
    const days = parseFloat(currentInput || display.innerText);
    if (isNaN(days) || days <= 0) return;

    const totalBudget = days * 70 * 100;
    
    const currentVal = display.innerText;
    display.innerText = totalBudget.toLocaleString() + " ₽";
    display.style.fontSize = "1.3rem";

    setTimeout(() => {
        display.innerText = currentVal;
        display.style.fontSize = "2rem";
    }, 2000);
};

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;
        const text = button.innerText;

        if (id.startsWith('digit_')) {
            currentInput += text;
            display.innerText = currentInput;
        } 
        else if (id === 'op_dot') {
            if (!currentInput.includes('.')) currentInput += ".";
            display.innerText = currentInput;
        } 
        else if (id === 'op_clear') {
            currentInput = ""; previousValue = 0; operator = null;
            display.innerText = "0";
        } 
        else if (id === 'op_budget') {
            calculateRequiredBudget();
        } 
        else if (id === 'op_revoke') {
            currentInput = revokeVisas(parseFloat(currentInput || 0)).toString();
            display.innerText = currentInput;
        } 
        else if (id === 'op_rate') {
            currentInput = getApprovalRate(parseFloat(currentInput || 0)).toString();
            display.innerText = currentInput;
        } 
        else if (id === 'op_report') {
            if (operator && currentInput !== "") {
                let result = 0;
                let second = parseFloat(currentInput);
                if (operator === '+') result = addApplications(previousValue, second);
                if (operator === '-') result = subtractDenials(previousValue, second);
                if (operator === '*') result = multiplyIssuedVisas(previousValue, second);
                if (operator === '/') result = divideByConsulates(previousValue, second);
                display.innerText = result;
                currentInput = result.toString();
                operator = null;
            }
        } 
        else {
            if (currentInput !== "") {
                previousValue = parseFloat(currentInput);
                operator = text === 'x' ? '*' : text;
                currentInput = "";
            }
        }
    });
});


const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
document.body.style.backgroundImage = document.body.style.backgroundImage.includes('moscow.jpg') 
    ? "url('light.jpg')" : "url('moscow.jpg')";
});