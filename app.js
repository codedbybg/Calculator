// Existing selectors
const inputField = document.getElementsByTagName("input")[0];
const buttons = document.getElementsByClassName("button");
const main_container = document.querySelector(".container");
const remove = document.querySelector(".remove");

console.log(remove.innerText);

// Click event for buttons
for (let button of buttons) {
  button.addEventListener("click", function () {
    handleInput(this.innerText);
  });
}

// Keyboard support
document.addEventListener("keydown", function (event) {
  let key = event.key;

  // Map keyboard keys to calculator buttons
  if (!isNaN(key) || ["+", "-", "*", "/", ".", "%"].includes(key)) {
    handleInput(key);
  } else if (key === "Enter" || key === "=") {
    handleInput("=");
  } else if (key === "Backspace") {
    handleInput("D");
  } else if (key.toLowerCase() === "c") {
    handleInput("C");
  }
});

// Common function for handling both button clicks and keyboard keys
function handleInput(clickValue) {
  main_container.classList.add("animate-gradient");

  setTimeout(() => {
    main_container.classList.remove("animate-gradient");
  }, 150);

  let expr = inputField.value;

  if (clickValue === "C") {
    inputField.value = "";
  } else if (clickValue === "%") {
    if (!expr.endsWith("%")) {
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
  } else if (clickValue === "D") {
    inputField.value = inputField.value.slice(0, -1);
  } else {
    inputField.value += clickValue;
  }
}

// Percentage conversion logic
function convertPercentages(expr) {
  // Handle "A%B" -> (A / 100 * B)
  expr = expr.replace(/(\d+(\.\d+)?)%\s*(\d+(\.\d+)?)/g, (_, a, _2, b) => {
    return `(${a} / 100 * ${b})`;
  });

  // Handle "A%" -> (A/100)
  expr = expr.replace(/(\d+(\.\d+)?)%/g, (_, a) => {
    return `(${a} / 100)`;
  });

  return expr;
}
