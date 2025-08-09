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
       if (!expr.endsWith("%") && expr.length > 0) {
        inputField.value += "%";
     }
    } else if (clickValue === "=") {
      try {
        let exprToEval = convertPercentages(inputField.value);
        let result = eval(exprToEval);
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

function convertPercentages(expr) {
    // Handle "A%B" -> (A / 100 * B) (with or without space)
    expr = expr.replace(/(\d+(\.\d+)?)%\s*(\d+(\.\d+)?)/g, (_, a, _2, b) => {
        return `(${a} / 100 * ${b})`;
    });

    // Handle "A%" -> (A/100)
    expr = expr.replace(/(\d+(\.\d+)?)%/g, (_, a) => {
        return `(${a} / 100)`;
    });

    return expr;
}