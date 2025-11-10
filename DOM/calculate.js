// script.js

const display = document.getElementById('display');

function appendNumber(num) {
  display.value += num;
}

function appendOperator(op) {
  display.value += op;
}

function clearDisplay() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    // Replace ^ with ** for exponentiation
    let expression = display.value.replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)');

    // Replace '^' with '**' for all cases (supports a^b)
    expression = expression.replace(/\^/g, '**');

    // Evaluate with Math functions allowed (sin, cos, tan, log, sqrt)
    const result = eval(expression);

    display.value = result;
  } catch (e) {
    display.value = 'Error';
  }
}
