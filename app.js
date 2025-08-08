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

    if (clickValue === "C") {
      inputField.value = "";
    } else if (clickValue === "=") {
      try {
        let result = eval(inputField.value);
        inputField.value = result;
      } catch (error) {
        inputField.value = "Error";
      }
    } else if(clickValue === "D"){
      inputField.value = inputField.value.slice(0,-1);
    } else if(clickValue === "%"){
      if(inputField.value){
        inputField.value = parseFloat(inputField.value)/100;
      } 
    } else {
      inputField.value += clickValue;
    }
  });
}
