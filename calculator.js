"use strict";

/*

    Simple Calculator app
    Author: Dmitrii Sumenko
    Date: 03/11/2023
    FileName: calculator.js

*/
let value1 = 0.0;
let value2 = 0.0;
let result = 0.0;
let zeroTyped = false;
let dotTyped = false;
let minusTyped = false;
let block = false;
let sign = "";
let error = false;
let max_length = 15;
let max_number = 999999999999999;
let display = document.getElementById('display');

let buttons = Array.from(document.getElementsByClassName('button'));

buttons.map(button => {
    button.addEventListener('click', (e) => {
        let my_length = display.innerText.length;
        let met_condition = (display.innerText[0] !== '0' || display.innerText.startsWith('0.')) && !block && my_length < max_length;

        switch (e.target.innerText) {
            case '.':
                if (display.innerText !== '' && !dotTyped && my_length < max_length && !error) {
                    display.innerText += '.';
                    dotTyped = true;
                }
                break
            case '0':
                if (met_condition) {
                    display.innerText += '0';
                    zeroTyped = true;
                }
                break;
            case '1':
                if (met_condition) {
                    display.innerText += 1;
                }
                break;
            case '2':
                if (met_condition) {
                    display.innerText += 2;
                }
                break;
            case '3':
                if (met_condition) {
                    display.innerText += 3;
                }
                break;
            case '4':
                if (met_condition) {
                    display.innerText += 4;
                }
                break;
            case '5':
                if (met_condition) {
                    display.innerText += 5;
                }
                break;
            case '6':
                if (met_condition) {
                    display.innerText += 6;
                }
                break;
            case '7':
                if (met_condition) {
                    display.innerText += 7;
                }
                break;
            case '8':
                if (met_condition) {
                    display.innerText += 8;
                }
                break;
            case '9':
                if (met_condition) {
                    display.innerText += 9;
                }
                break;
            case 'C':
                clear();
                break;
            case '-':
                subtraction();
                break;
            case '+':
                addition();
                break;
            case '/':
                division();
                break;
            case '*':
                multiplication();
                break;
            case '=':
                if (!block && !error && result.toString() !== 'NaN' && result.toString() !== "Infinity" && result.toString() !== "-Infinity") {
                    permission();

                    if (sign === '-') {
                        value2 = parseFloat(display.innerText);
                        result = (value1 - value2).toFixed(4);
                        display.innerText = result.toString();

                    } else if (sign === '+') {
                        value2 = parseFloat(display.innerText);
                        result = (value1 + value2).toFixed(4);

                        if (result < max_number) {
                            display.innerText = result.toString();
                        } else {
                            display.innerText = 'number is too big';
                            error = true;
                        }
                    } else if (sign === '*') {
                        value2 = parseFloat(display.innerText);
                        result = (value1 * value2).toFixed(4);
                        if (result < max_number) {
                            display.innerText = result.toString();
                        } else {
                            display.innerText = 'number is too big';
                            error = true;
                        }

                    } else if (sign === '/') {
                        value2 = parseFloat(display.innerText);
                        if (value2 === 0) {
                            display.innerText = "error";
                            error = true;
                            block = true;
                        } else {
                            value2 = parseFloat(display.innerText);
                            result = (value1 / value2).toFixed(4);
                            display.innerText = result.toString();
                        }
                    }
                }
                break;
            case '←':
                if (display.innerText && !block && !error) {
                    display.innerText = display.innerText.slice(0, -1);
                }
                break;
            default: display.innerText = "some error occurred";
        }

    });
});

function permission() {
    minusTyped = false;
    dotTyped = false;
    zeroTyped = false;
    block = false;
}

function clear() {
    zeroTyped = false;
    dotTyped = false;
    minusTyped = false;
    block = false;
    error = false;
    display.innerText = '';
}

function multiplication() {
    if (!error) {
        sign = '*';
        value1 = parseFloat(display.innerText);
        display.innerText = "";
        permission();
    }
}

function division() {
    if (!error) {
        sign = '/';
        value1 = parseFloat(display.innerText);
        display.innerText = "";
        permission();
    }
}

function addition() {
    if (!error) {
        sign = '+';
        value1 = parseFloat(display.innerText);
        display.innerText = "";
        permission();
    }
}

function subtraction() {
    if (display.innerText === "" && !minusTyped && !error) {
        display.innerText += '-';
        minusTyped = true;
    } else if (!error) {
        sign = '-';
        value1 = parseFloat(display.innerText);
        display.innerText = "";
        permission();
    }
}
