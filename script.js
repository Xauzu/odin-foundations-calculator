// Four basic operations
let add = (num1, num2) => num1 + num2;
let subtract = (num1, num2) => num1 - num2;
let multiply = (num1, num2) => num1 * num2;
let divide = (num1, num2) => num1 / num2;

// Operation variables
let expression = '', result = null;

// Update display
let update = () => {
    const expressionDisplay = document.querySelector('#expression');
    expressionDisplay.textContent = expression;

    if (result) {
        const resultDisplay = document.querySelector('#result');
        resultDisplay.textContent = result;
    }
}

// Operate based on selected operators
let operate = (op, num1, num2) => {
    if (op === '+') return add(num1, num2);
    if (op === '-') return subtract(num1, num2);
    if (op === '*') return multiply(num1, num2);
    if (op === '/') return divide(num1, num2);
}