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
let decimalPossible = true;
let screen = document.querySelector(".screen__result");
let keysNumber = document.querySelectorAll(".keypad__number");
let keysOperator = document.querySelectorAll(".keypad__operator");

function updateScreen() {
  screen.textContent = result;
}
function throwError() {
  document.querySelector(".screen").classList.add("screen--error");
  setTimeout(() => {
    document.querySelector(".screen").classList.remove("screen--error");
  }, 1000);
}
updateScreen();

for (let key of keysNumber) {
  key.addEventListener("click", () => {
    if (result == "0") {
      if (key.innerHTML == ".") {
        result = "0" + key.innerHTML;
        formula += key.innerHTML;
        decimalPossible = false;
      } else {
        result = key.innerHTML;
        formula = result;
      }
    } else {
      if (key.innerHTML == "." && decimalPossible) {
        decimalPossible = false;
        result += key.innerHTML;
        formula += key.innerHTML;
      } else if (key.innerHTML == "." && !decimalPossible) {
        throwError();
      } else {
        result += key.innerHTML;
        formula += key.innerHTML;
      }
    }
    updateScreen();
  });
}

for (let key of keysOperator) {
  key.addEventListener("click", () => {
    if (screen.innerHTML == "0") {
      throwError();
    } else {
      if (key.innerHTML == "x") {
        formula = formula + "*";
        result = "x";
        updateScreen();
        result = "";
        decimalPossible = true;
      } else {
        formula = formula + key.innerHTML;
        result = key.innerHTML;
        updateScreen();
        result = "";
        decimalPossible = true;
      }
    }
  });
}

document.querySelector("#equal").addEventListener("click", () => {
  result = eval(formula);
  if (!isNaN(result) && result % 1 != 0) {
    screen.textContent = result.toFixed(2);
    result = 0;
    decimalPossible = true;
  } else {
    updateScreen();
    result = 0;
  }
});

//DELETE AND RESET
document.querySelector("#reset").addEventListener("click", () => {
  result = 0;
  updateScreen();
  formula = "";
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
});
