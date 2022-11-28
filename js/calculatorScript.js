let allInputContainer = "";

const numberButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".allClear");
const deleteButton = document.querySelector(".delete");
const plusMinusButton = document.querySelector(".plus-minus");
const allInputsButton = document.querySelector(".allInputs");
const equalsButton = document.querySelector(".equals");
const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".previous-operand");


numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        let text = button.innerText;
        if (text === "." && currentOperand.innerHTML.includes(".")) return;
        currentOperand.innerHTML += text;

        allInputContainer += text;
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentOperand.innerHTML !== "" && previousOperand.innerHTML === "" &&  //new code
        currentOperand.innerHTML.includes(" = ")) {  //new code
            let valueHolder = currentOperand.innerHTML.split(" = ")[1];  //new code
            currentOperand.innerHTML = valueHolder;  //new code

            allInputContainer += valueHolder;  //new code
        }

        if (currentOperand.innerHTML === "" && previousOperand.innerHTML !== "") {  //new code  latest
            if (previousOperand.innerHTML.endsWith("+") || previousOperand.innerHTML.endsWith("-") || //new code latest
                previousOperand.innerHTML.endsWith("×") || previousOperand.innerHTML.endsWith("÷")) {  //new code
                let value = previousOperand.innerHTML.slice(0, -1);  //new code latest
                previousOperand.innerHTML = value + button.innerHTML;  //new code  latest

                if (allInputContainer.endsWith(" ")) {  //new code latest
                    let operatorValue = allInputContainer.slice(0, -2);  //new code
                    allInputContainer = operatorValue + button.innerHTML + " "; 
                } else {
                    allInputContainer = allInputContainer.slice(0, -1);  //new code latest
                    allInputContainer = allInputContainer + button.innerHTML;
                }
            }
        }

        if (currentOperand.innerHTML !== "") {
            let text = button.innerHTML;
            if (previousOperand.innerHTML != "") {
                let operator = previousOperand.innerHTML.slice(-1);
                previousOperand.innerHTML = compute(operator) + text;
                currentOperand.innerHTML = "";

                allInputContainer += ` ${text} `;
            } else {
            previousOperand.innerHTML = currentOperand.innerHTML + text;
            currentOperand.innerHTML = "";

            allInputContainer += ` ${text} `;
            }
        }
    });
});


plusMinusButton.addEventListener("click", () => {
    if (previousOperand.innerHTML != "" && previousOperand.innerHTML.endsWith("+")) {
        previousOperand.innerHTML = previousOperand.innerHTML.replace("+", "-");
        allInputContainer = allInputContainer.replace("+", "-");
    } else if (previousOperand.innerHTML != "" && previousOperand.innerHTML.endsWith("-")) {
        previousOperand.innerHTML = previousOperand.innerHTML.replace("-", "+");
        allInputContainer = allInputContainer.replace("-", "+");
    }
});


equalsButton.addEventListener("click", () => {
    if (previousOperand.innerHTML && currentOperand.innerHTML != "") {
    let operator = previousOperand.innerHTML.slice(-1);
    currentOperand.innerHTML = compute(operator);
    previousOperand.innerHTML = "";

    allInputContainer += ` = ${currentOperand.innerHTML}`;
    }
});


clearButton.addEventListener("click", () => {
    currentOperand.innerHTML = "";
    previousOperand.innerHTML = "";
    allInputContainer = "";
});

deleteButton.addEventListener("click", () => {
    if (currentOperand.innerHTML.includes(" = ")) return;
    if (currentOperand.innerHTML === "" && previousOperand.innerHTML !== "") {
        currentOperand.innerHTML = previousOperand.innerHTML;
        previousOperand.innerHTML = "";
    }
    if (previousOperand.innerHTML === "" && currentOperand.innerHTML !== "" &&  //new code
    currentOperand.innerHTML.endsWith(" ")) {  //new code
        currentOperand.innerHTML = currentOperand.innerHTML.slice(0, -2);  //new code
    }
    currentOperand.innerHTML = currentOperand.innerHTML.slice(0, -1);
    if (allInputContainer.endsWith(" ")) {  //new code
        allInputContainer = allInputContainer.slice(0, -2);  //new code
    }
    allInputContainer = allInputContainer.slice(0, -1);
});

allInputsButton.addEventListener("click", () => {
  if (currentOperand.innerHTML !== "" && previousOperand.innerHTML === "" && allInputContainer.includes(" = ")) {
    currentOperand.innerHTML = allInputContainer;
    allInputContainer = "";
  }
});


function compute(operator) {
    let previous = parseFloat(previousOperand.innerHTML.slice(0, -1));
    let current = parseFloat(currentOperand.innerHTML);
    if (isNaN(previous) || isNaN(current)) return;
    switch (operator) {
        case "+":
            return previous + current;
        case "-":
            return previous - current;
        case "×":
            return previous * current; 
        case "÷":
            return previous / current;
        default:
            return;
    }
}


