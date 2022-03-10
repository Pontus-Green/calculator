// Listeners and Display that needs to be updated.
const display = document.querySelector('.display');

//update display by pressing buttons


// Operators
function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
function operate(operator, a,b){
    display.textContent=operator(a,b);
}


console.log(operate(subtract,2,2));