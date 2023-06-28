// Four basic operations
let add = (num1, num2) => num1 + num2;
let subtract = (num1, num2) => num1 - num2;
let multiply = (num1, num2) => num1 * num2;
let divide = (num1, num2) => num1 / num2;

// Operation variables
let lastKeyType = 0; // Key type, 1 = num, 2 = operator, 3 = result
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

let calculate = () => {
    const steps = expression.split(' ');
    console.log(steps);
}

const buttons = document.querySelectorAll(`.keys`);
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const key = button.getAttribute('data-key');
        if (key === 'C') { 
            expression = '';
            result = null;
        }
        else if (key === '=') calculate();
        else 
        {
            const type = button.getAttribute('data-type');
            if (expression === '') {
                if (type === '2') expression += '0 ';
                expression += key;
            } 
            else {
                // Add space for readability
                if (type === 2 || lastKeyType !== type) expression += ' ';
                expression += key;
            }
            lastKeyType = type;
            update();
        }
    });
});