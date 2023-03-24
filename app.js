//THEME TOGGLE
let app = document.querySelector(".app");
let dot = document.querySelector(".toggle__dot");
let choiceZones = document.querySelectorAll(".toggle__choice");
let choiceNumbers = document.querySelectorAll(".toggle__numbers div");
for (let i = 0; i < choiceNumbers.length; i++) {
  choiceNumbers[i].addEventListener("click", () => {
    theme = i + 1;
    app.setAttribute("data-theme", i + 1);
    dot.style.left = 26 * i + 3 + "px";
  });
}
let theme = 1;
for (let i = 0; i < choiceZones.length; i++) {
  choiceZones[i].addEventListener("click", () => {
    theme = i + 1;
    app.setAttribute("data-theme", i + 1);
    dot.style.left = 26 * i + 3 + "px";
  });
}

//CALCULATOR
let result = 0;
let formula = "";
let screen = document.querySelector(".screen__result");
let keysNumber = document.querySelectorAll(".keypad__number");
let keysOperator = document.querySelectorAll(".keypad__operator");

function updateScreen() {
  if (!isNaN(result) && result % 1 != 0) {
    console.log(result);
    console.log("decimal");
    screen.textContent = result.toFixed(2);
  } else {
    screen.textContent = result;
  }
}
updateScreen();

for (let key of keysNumber) {
  key.addEventListener("click", () => {
    if (result == "0") {
      result = key.innerHTML;
      formula = result;
    } else {
      result += key.innerHTML;
      formula += key.innerHTML;
    }
    updateScreen();
    console.log(formula);
  });
}

for (let key of keysOperator) {
  key.addEventListener("click", () => {
    if (key.innerHTML == "x") {
      formula = formula + "*";
      console.log(formula);
      result = "x";
      updateScreen();
      result = "";
    } else {
      formula = formula + key.innerHTML;
      console.log(formula);
      result = key.innerHTML;
      updateScreen();
      result = "";
    }
  });
}

document.querySelector("#equal").addEventListener("click", () => {
  result = eval(formula);
  updateScreen();
  result = 0;
});

//DELETE AND RESET
document.querySelector("#reset").addEventListener("click", () => {
  result = 0;
  updateScreen();
  formula = "";
  console.log(formula);
});
document.querySelector("#delete").addEventListener("click", () => {
  if (result.length > 1) {
    result = result.slice(0, -1);
    formula = result;
  } else {
    result = 0;
    formula = "";
  }
  updateScreen();
  console.log(formula);
});
