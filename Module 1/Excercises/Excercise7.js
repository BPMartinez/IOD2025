console.log('Excercise 7!')



/**
 * Multiplies two numbers and logs the result to the console.
 *
 * @param {number} a - The first number to multiply.
 * @param {number} b - The second number to multiply.
 * @returns {void} This function does not return a value; it only logs the result.
 */
function multiply(a, b) {
    console.log(a * b);
}

multiply(5, 1);

/**
 * Subtracts the second number from the first and logs the result to the console.
 *
 * @param {number} a - The number to subtract from.
 * @param {number} b - The number to subtract.
 * @returns {void} This function does not return a value; it only logs the result.
 */
function subtract(a, b) {
    console.log(a - b);
}

subtract(6, 1);

/**
 * Divides the first number by the second and logs the result to the console.
 *
 * @param {number} a - The dividend (number to be divided).
 * @param {number} b - The divisor (number to divide by).
 * @returns {void} This function does not return a value; it only logs the result.
 */
function divide(a, b) {
    console.log(a / b);
}

divide(10, 2);

/**
 * Adds two numbers and logs the result to the console.
 *
 * @param {number} a - The first number to add.
 * @param {number} b - The second number to add.
 * @returns {void} This function does not return a value; it only logs the result.
 */
function sum(a, b) {
    console.log(a + b);
}

sum(4, 1);


function assertEqual(actual, expected, message) {
    if (actual === expected) {
        console.log(`PASS: ${message}`);
    } else {
        console.error(`FAIL: ${message} (expected ${expected}, got ${actual})`);
    }
}

// Multiply tests
assertEqual(multiply(5, 2), 10, "multiply 5 * 2 = 10");
assertEqual(multiply(7, 0), 0, "multiply 7 * 0 = 0");
assertEqual(multiply(-3, 4), -12, "multiply -3 * 4 = -12");

// Subtract tests
assertEqual(subtract(6, 2), 4, "subtract 6 - 2 = 4");
assertEqual(subtract(2, 5), -3, "subtract 2 - 5 = -3");
assertEqual(subtract(10, 0), 10, "subtract 10 - 0 = 10");

// Divide tests
assertEqual(divide(10, 2), 5, "divide 10 / 2 = 5");
assertEqual(divide(9, -3), -3, "divide 9 / -3 = -3");
assertEqual(divide(0, 5), 0, "divide 0 / 5 = 0");
assertEqual(divide(5, 0), Infinity, "divide 5 / 0 = Infinity");

// Sum tests
assertEqual(sum(4, 6), 10, "sum 4 + 6 = 10");
assertEqual(sum(10, -3), 7, "sum 10 + -3 = 7");
assertEqual(sum(7, 0), 7, "sum 7 + 0 = 7");
