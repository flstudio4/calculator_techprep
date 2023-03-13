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

let max_number = 999999999999999;
let display = document.getElementById('display');

let buttons = Array.from(document.getElementsByClassName('button'));

buttons.map(button => {
    button.addEventListener('click', (e) => {

        let max_length = 15;
        let my_length = display.innerText.length;
        let metConditionForNumbers = (my_length < max_length && (display.innerText[0] !== '0' || display.innerText !== '-0') && (!error && !block));
        let metConditionsForSigns = !error && display.innerText !== '-' && display.innerText !== '-0' && display.innerText !== '-0.' && display.innerText !== '0.' && display.innerText !== '0';
        let metConditionsForDot = my_length < max_length && display.innerText !== '' && !dotTyped && !error && !block && display.innerText !== '-';
        let metConditionForZero = (my_length < max_length && (display.innerText[0] !== '0' && !display.innerText.startsWith('-0') || display.innerText.startsWith('0.') || display.innerText.startsWith('-0.')) && !error && !block);

        switch (e.target.innerText) {
            case '.':
                if (metConditionsForDot) {
                    display.innerText += '.';
                    dotTyped = true;
                }
                break
            case '0':
                if (metConditionForZero) {
                    display.innerText += '0';
                    zeroTyped = true;
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if (metConditionForNumbers) {
                    display.innerText += e.target.innerText;
                }
                break;
            case 'C':
                zeroTyped = false;
                dotTyped = false;
                minusTyped = false;
                block = false;
                error = false;
                display.innerText = '';
                break;
            case '-':
                if (display.innerText === "" && !minusTyped && !error && !block) {
                    display.innerText += '-';
                    minusTyped = true;
                } else if(metConditionsForSigns) {
                    sign = '-';
                    value1 = parseFloat(display.innerText);
                    display.innerText = "";
                    minusTyped = false;
                    dotTyped = false;
                    zeroTyped = false;
                    block = false;
                }
                break;
            case '+':
                if (metConditionsForSigns) {
                    sign = '+';
                    value1 = parseFloat(display.innerText);
                    display.innerText = "";
                    minusTyped = false;
                    dotTyped = false;
                    zeroTyped = false;
                    block = false;
                }
                break;
            case '/':
                if (metConditionsForSigns) {
                    sign = '/';
                    value1 = parseFloat(display.innerText);
                    display.innerText = "";
                    minusTyped = false;
                    dotTyped = false;
                    zeroTyped = false;
                    block = false;
                }
                break;
            case '*':
                if (metConditionsForSigns) {
                    sign = '*';
                    value1 = parseFloat(display.innerText);
                    display.innerText = "";
                    minusTyped = false;
                    dotTyped = false;
                    zeroTyped = false;
                    block = false;
                }
                break;
            case '=':
                if (!error && !block) {
                    switch (sign) {
                        case '-':
                            value2 = parseFloat(display.innerText);
                            result = (value1 - value2);
                            if (Number.isInteger(result)) {
                                result = Math.round(result);
                            }
                            else {
                                result = parseFloat(result).toFixed(6);
                            }
                            display.innerText = result.toString();
                            block = true;
                            value1 = result;
                            break;
                        case '+':
                            value2 = parseFloat(display.innerText);
                            result = (value1 + value2);
                            numberTooBig(result);
                            value1 = result;
                            break;
                        case '*':
                            value2 = parseFloat(display.innerText);
                            result = (value1 * value2);
                            numberTooBig(result);
                            value1 = result;
                            break;
                        case '/':
                            value2 = parseFloat(display.innerText);
                            if (value2 === 0) {
                                display.innerText = "error";
                                error = true;
                                block = true;
                            } else {
                                value2 = parseFloat(display.innerText);
                                result = (value1 / value2);
                                if (Number.isInteger(result)) {
                                    result = Math.round(result);
                                }
                                else {
                                    result = parseFloat(result).toFixed(6);
                                }
                                display.innerText = result.toString();
                                block = true;
                                value1 = result;
                            }
                            break;
                        default: console.log('some error has occurred');
                    }
                }
                break;
            case '←':
                if (display.innerText && !block && !error) {
                    display.innerText = display.innerText.slice(0, -1);
                }
                break;
            default: console.log("some error occurred");
        }

    });
});

function numberTooBig (result) {
    if (result < max_number) {
        if (Number.isInteger(result)) {
            result = Math.round(result);
        }
        else {
            result = parseFloat(result).toFixed(6);
        }
        display.innerText = result.toString();
        block = true;
    } else {
        display.innerText = 'number is too big';
        error = true;
        block = true;
    }
}
