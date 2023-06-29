// Four basic operations
let add = (num1, num2) => +num1 + +num2;
let subtract = (num1, num2) => num1 - num2;
let multiply = (num1, num2) => num1 * num2;
let divide = (num1, num2) => num1 / num2;

// Operation variables
let lastKeyType = 0; // Key type, 1 = num, 2 = operator
let expression = '', result = null;

// Update display
let update = () => {
    const expressionDisplay = document.querySelector('#expression');
    expressionDisplay.textContent = expression;

    const resultDisplay = document.querySelector('#result');
    if (result) resultDisplay.textContent = result;
    else resultDisplay.textContent = '';
}

// Operate based on selected operators
let operate = (op, num1, num2) => {
    console.log(num1 + " " + op + " " + num2)
    if (op === '+') return add(num1, num2);
    if (op === '-') return subtract(num1, num2);
    if (op === '*') return multiply(num1, num2);
    if (op === '/') return divide(num1, num2);
}

// 5 + 2
let calculate = () => {
    const steps = expression.split(' ');
    if (lastKeyType === '2') result = 'ERROR: Ending in operator'; // Ending in operator
    else {
        let current = steps[0];
        let index = 1;
        while (index < steps.length) {
            let op = steps[index];
            let num = steps[index + 1];

            if (op === '/' && +num === 0) {
                console.log('div by 0');
                current = 'ERROR: Division by 0';
                break;
            }

            current = operate(op, current, num);
            
            index += 2;

        }
        result = current;
    }
}

let buildExpression = (key, type) => {
    //console.log("type: [" + type + "]");
    if (key === 'Delete') { 
        expression = '';
        result = null;
    }
    else if (key === 'Backspace') {
        if (expression.length > 0) {
            expression = expression.slice(0, expression.length - 1);
            if (expression.charAt(expression.length - 1) === ' ') {
                expression = expression.slice(0, expression.length - 1);
            }

            // Reset lastKeyType
            if (!isNaN(parseInt(expression.charAt(expression.length - 1)))) lastKeyType = '1';
            else lastKeyType = '2';
        }
    }
    else if (key === 'Enter') calculate();
    else if (type > 0)
    {
        if (expression === '') {
            if (type === '2') expression += '0 ';
            expression += key;
        } 
        else {
            if (type === '2' && lastKeyType === type) {
                // Remove last operator and to allow swapping to new operator
                expression = expression.slice(0, expression.length - 1);
            }
            // Add space for readability
            else if (type === '2' || lastKeyType !== type) expression += ' ';

            if (key === '.') {
                // Detect multiple '.'
                const exp = expression.split(' ');
                let num = exp[exp.length - 1];
                if (!num.includes('.'))
                    expression += key;
            }
            else 
                expression += key;
        }
        lastKeyType = type;
    }
    update();
}

const buttons = document.querySelectorAll(`.keys`);
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const key = button.getAttribute('data-key');
        const type = button.getAttribute('data-type');
        buildExpression(key, type);
    });
});


document.addEventListener('keydown', (e) => {
    const key = e.key;
    let type = '0';

    const operator = ['+', '-', '*', '/'];
    if (!isNaN(parseInt(key)) || key === '.') type = '1';
    operator.forEach(op => {
        if (key.includes(op)) type = '2';
    });

    buildExpression(key, type);
});