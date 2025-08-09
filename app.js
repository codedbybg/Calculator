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
        let result = eval(expr);
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
    let expr = inputField.value.trim();

    // Match "number operator number"
    let match = expr.match(/(-?\d+(\.\d+)?)([+\-*/])(-?\d+(\.\d+)?)$/);

    if (match) {
        let firstNum = parseFloat(match[1]);
        let operator = match[3];
        let secondNum = parseFloat(match[4]);

        let result;
        if (operator === "+" || operator === "-") {
            // Mobile calculator: "A + B%" = "A + (A * B / 100)"
            result = firstNum * (secondNum / 100);
        } else if (operator === "*" || operator === "/") {
            // Mobile calculator: "A * B%" = "A * (B / 100)"
            result = secondNum / 100;
        }

        inputField.value = `${firstNum}${operator}${result}`;
    } 
    else if (/(-?\d+(\.\d+)?)\s*%$/.test(expr)) {
        // Case: "200%" → 2 (1% of 200)
        let num = parseFloat(expr) || 0;
        inputField.value = num / 100;
    }
    else if (/(-?\d+(\.\d+)?)\s*%\s*(-?\d+(\.\d+)?)$/.test(expr)) {
        // Case: "200%10" → 20 (10% of 200)
        let parts = expr.match(/(-?\d+(\.\d+)?)\s*%\s*(-?\d+(\.\d+)?)/);
        let base = parseFloat(parts[1]);
        let percent = parseFloat(parts[3]);
        inputField.value = (base * percent) / 100;
    }
    else {
        // Single number: convert to fraction
        let num = parseFloat(expr) || 0;
        inputField.value = num / 100;
    }
}