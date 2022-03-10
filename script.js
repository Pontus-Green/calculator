// Listeners and Display that needs to be updated.
const display = document.querySelector(".display");
const calcs = document.querySelector(".calcs");
const buttons = document.querySelectorAll("button");


//const global variable that handles digits
const currentDigits = [];
const lastOperator = [];
let operatorEqual = false;
let currentTotal =0;

//Objects to handle operator or digits
const digits = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
}

const operators = {
    clear: "clear",
    backspace: "backspace",
    d: "division",
    m: "multiply",
    s: "subtract",
    a: "add",
    e: "equal",
}

//update display by pressing buttons
buttons.forEach((button) => {
    button.addEventListener('click', () =>{
        handleClick(button.id);
    });
});

//handle clicks
function handleClick(value){
    //Check if last user input was an operator change if user switches operator
    let lastOperatorUsed = checkIfOperate();
    if (lastOperatorUsed && currentDigits.length == 1){
        if (value in digits){ // Let user add second number to operate with
            display.textContent = "";
            display.textContent += value;
            calcs.textContent += value;
            console.log(`${value} was clicked`);
            console.log("i am inside checkifoperate");
        }
    } else if (value in digits){
        display.textContent += value;
        calcs.textContent += value;
        console.log(`${value} was clicked`);
    } else if(value in operators && display.textContent == ""){
        currentDigits.push(0);
        calcs.textContent += 0;
        console.log("zero was added because no number provided")
    } else if(value in operators){
        calcs.textContent += value;
        currentDigits.push(display.textContent);
        display.textcontent = "";
        console.log(`${value} operator used`)
    }

    if(currentDigits.length == 2){
        console.log("I should probably operate now");
        
        currentDigits.push(display.textContent);
        let result = operate(value);
        lastOperator.push(value);

        calcs.textContent += currentTotal;
        calcs.textContent += value; // get last
        console.log("double operation move succesful");
    }
}

//check if we do operation or store number
function checkIfOperate(){
    console.log("I checked operation")
    lastInput = calcs.textContent.slice(-1);
    console.log(lastInput);
    console.log(lastInput in operators);
    console.log(lastInput)
    if(lastInput in operators){
        return lastInput;
    } else{
        return false;
    }
}

// Operators
function add(a,b){
    return parseInt(a)+parseInt(b);
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
function equals(a,b){
    return a+b;
}
function operate(operator){
    let result;
    switch(operator){
        case 'a':
            result = add(currentDigits[0],currentDigits[1]);
            console.log("result:"+result)
            display.textContent = result;
            currentTotal = result;
            currentDigits.length = 0;
            currentDigits.push(currentTotal);
            break;
        case 'e':
    }
}
