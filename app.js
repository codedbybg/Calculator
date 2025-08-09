const inputField = document.getElementsByTagName("input")[0];

const buttons = document.getElementsByClassName("button");
const main_container = document.querySelector(".container");
const remove = document.querySelector(".remove");
console.log(remove.innerText);

for (let button of buttons) {
  button.addEventListener("click", function (Icon) {
    console.log("Button clicked");
    main_container.classList.add("animate-gradient");

    setTimeout(() => {
      main_container.classList.remove("animate-gradient");
    }, 150); // match animation time

    let clickValue = this.innerText;
    let expr = inputField.value;

    if (clickValue === "C") {
      inputField.value = "";
    } else if(clickValue === "%"){
      handlePercentage();
    } else if (clickValue === "=") {
      try {
        let result = eval(expr.replace(/%/g, "%"));
        inputField.value = result;
      } catch (error) {
        inputField.value = "Error";
      }
    } else if(clickValue === "D"){
      inputField.value = inputField.value.slice(0,-1);
    } else {
      inputField.value += clickValue;
    }
  });
}

function handlePercentage() {
    let expr = inputField.value;

    // Try matching "number operator number%"
    let match = expr.match(/(-?\d+(\.\d+)?)([+\-*/])(-?\d+(\.\d+)?)$/);

    if (match) {
        let firstNum = parseFloat(match[1]);
        let operator = match[3];
        let secondNum = parseFloat(match[4]);

        let result;
        if (operator === "+" || operator === "-") {
            // % means percentage of first number
            result = firstNum * (secondNum / 100);
        } else if (operator === "*" || operator === "/") {
            // % means fraction (0.XX)
            result = secondNum / 100;
        }

        inputField.value = expr.replace(/(-?\d+(\.\d+)?)([+\-*/])(-?\d+(\.\d+)?)$/, 
                                        `${firstNum}${operator}${result}`);
    } 
    else {
        // Single number case → convert to fraction
        let num = parseFloat(expr) || 0;
        inputField.value = num / 100;
    }
}
