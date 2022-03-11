// Listeners and Display that needs to be updated.
const bodyDiv = document.querySelector("body");
const display = document.querySelector(".display");
const calcs = document.createElement("div");
const buttons = document.querySelectorAll("button");


//const global variable that handles digits
const currentDigits = [];
const lastOperator = [];
let equalFlag = false;
let currentTotal =0;
let mafsFlag = false;

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
    c: "clear",
    b: "backspace",
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
    bodyDiv.style.backgroundColor = "white";

    handleDecimalAndClear(value);

    //Check if last user input was an operator change if user switches operator
    let lastOperatorUsed = checkIfOperate();

    if ((lastOperatorUsed ||equalFlag) && currentDigits.length == 1){ // handles second pair of digits
        handleSecondInput(value);
    } else if(equalFlag && value in digits){ // when pressed equal -> then press number clear everything
        clear("e");
        display.textContent = value;
    }
    else if (value in digits){ // handle digit clicks
        display.textContent += value;
        calcs.textContent += value;
    } else if(value in operators && display.textContent == ""){ // handle operation click with empty start input
        currentDigits.push(0);
        calcs.textContent += 0;
    } else if(value in operators){ // handle operator clicks
        calcs.textContent += value;
        currentDigits.push(display.textContent);
        display.textcontent = "";
        latestOperatorPush(value);
    }

    if(currentDigits.length == 2){ // handle operation when digits have formed a pair
        currentDigits.push(display.textContent);
        operate(lastOperator.slice(-1)[0]);
        calcs.textContent += currentTotal;
        calcs.textContent += value; // get last if value is not equal to e
    }
}

function handleDecimalAndClear(value){
    //Clear if clicked
    if (value == "c") return clear("c");
    //Backspace if clicked 
    if (value == "b") return clear("b");

    //handle all decimal clicks
    if (equalFlag && value == "."){
        clear("e");
        display.textContent = ".";
    }else if(calcs.textContent.slice(-1)[0] in operators && value == "."){
        display.textContent = ".";
    } else if(!display.textContent.includes(".") && value == "."){ // add . if it does not exist
        display.textContent += ".";
    } else if(display.textContent.includes(".") && value == "."){ // just do nothing if it is clicked too many times.
        return; 
    }
}
//check if we do operation or store number
function checkIfOperate(){
    lastInput = calcs.textContent.slice(-1);

    if(lastInput in operators){
        lastOperator.push(lastInput);
        return lastInput;
    } else{
        return false;
    }
}
//Handle second input after operator as been clicked
function handleSecondInput(value){
    if (value in digits){ // Let user add second number to operate with
        if(equalFlag) clear("e"); //if equal was pressed last delete current pair of digits
        display.textContent = "";
        display.textContent += value;
        calcs.textContent += value;
    } else{
        calcs.textContent += value;
        display.textcontent = "";
        if(value == "e"){// flags equal true if pressed
            equalFlag = true;
        } else{
            equalFlag = false;
        }
    }
}
//Track latest operator used
function latestOperatorPush(value){
    if(value == "e"){
        equalFlag = true;
        lastOperator.push("e");
    }else if(value != lastOperator.slice(-1)[0]){
        lastOperator.push(lastOperator.slice(-1)[0]);
    }else{
        equalFlag = false;
        lastOperator.push(value);
    }
}
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
function equals(a,b){
    return a+b;
}
function operate(operator){
    let result;

    if(operator == "e"){
        filtered = lastOperator.filter(function(item){
            return item !== "e"
        });
        lastOperatorUsed = (filtered.slice(-1))[0];
        lastOperator.push("e");
        equalFlag= true;
    } else{
        lastOperatorUsed = operator;
        equalFlag = false;

    }
    switch(lastOperatorUsed){
        case 'a':
            result = add(+currentDigits[0],+currentDigits[1]);
            updateOperation(+result.toFixed(2));
            checkEqualLast("a");
            break;
        case 's':
            result = subtract(currentDigits[0],currentDigits[1]);
            updateOperation(+result.toFixed(2));
            checkEqualLast("s");
            break;
        case 'm':
            result = multiply(currentDigits[0],currentDigits[1]);
            updateOperation(+result.toFixed(2));
            checkEqualLast("m");
            break;
        case 'd':
            if(currentDigits[1] == "0"){//handle divison by zero, reset calculator
                display.textContent = "mafs";
                mafsCommited();
                currentTotal = 0;
                currentDigits.length = 0;
                lastOperator.length = 0;
            } else{
                result = divide(currentDigits[0],currentDigits[1]);
                updateOperation(+result.toFixed(2));
                checkEqualLast("d");
            }
            break;
        
        default:
            break;
    }
}

//Check if operator was called through equal
function checkEqualLast(fnc){
    if (equalFlag){
        lastOperator.push("e");
        equalFlag= true;
    } else{
        lastOperator.push(fnc)
        equalFlag = false;
    }
} 

//Clear types
function clear(type){
    switch(type){
        case "e":
            calcs.textContent = "";
            currentDigits.length = 0;
            currentTotal = 0;
            lastOperator.length = 0;
            equalFlag = false;
            break;
        case "c":
            calcs.textContent="";
            currentDigits.length = 0;
            lastOperator.length = 0;
            display.textContent ="";
            currentTotal = 0;
            equalFlag = false;
            break;
        case "b":
            if (equalFlag){
                currentDigits.pop()
                display.textContent = display.textContent.slice(0,-1);
                currentDigits.push(display.textContent);
            }else{
                display.textContent = display.textContent.slice(0,-1);
                calcs.textContent = calcs.textContent.slice(0,-1);
            }
            break;
    }
}

function updateOperation(result){ //Calculates and updates the variable storage and UI.
    display.textContent = result;
    currentTotal = result;
    currentDigits.length = 0;
    currentDigits.push(currentTotal);
}

function mafsCommited(){
    let imageContainer = document.createElement("div");
    imageContainer.style.display= "flex";
    imageContainer.style.flexDirection ="column";
    imageContainer.style.justifyContent = "center";
    imageContainer.style.width = "400px";
    imageContainer.style.alignSelf ="center";
    let mafsTitle = document.createElement("h1");
    mafsTitle.style.width = "100%";
    mafsTitle.textContent = "Ahhh, seems like you are a Mafs believer...";
    let img = document.createElement("img");
    img.src = "mafs.webp";
    imageContainer.appendChild(mafsTitle);
    imageContainer.appendChild(img);
    bodyDiv.appendChild(imageContainer);
    bodyDiv.style.backgroundColor = "red";
    bodyDiv.style.transition = "background 2000ms";
    mafsFlag = true;
}