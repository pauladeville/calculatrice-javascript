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

//display result on screen with a small delay
function updateScreen() {
  screen.classList.add("screen__result--appearing");
  screen.textContent = result;
  setTimeout(() => {
    screen.classList.remove("screen__result--appearing");
  }, 100);
}
//set the initial screen at 0
updateScreen();
//screen wiggles if not possible
function throwError() {
  document.querySelector(".screen").classList.add("screen--error");
  setTimeout(() => {
    document.querySelector(".screen").classList.remove("screen--error");
  }, 1000);
}
//add the chosen number to the ongoing formula
function addNumber(num) {
  //if nothing has been entered before
  if (result == "0") {
    //if decimal is pressed, create a decimal with the initial zero
    if (num == ".") {
      result = "0" + num;
      formula += num;
      decimalPossible = false;
      //if it is a number, display it and add it to the formula (string)
    } else {
      result = num;
      formula = result;
    }
    //if not (result and formula already populated)
  } else {
    //if the actual number is not already a decimal, add the dot and make it impossible to add another decimal for now
    if (num == "." && decimalPossible) {
      decimalPossible = false;
      result += num;
      formula += num;
    } else if (num == "." && !decimalPossible) {
      throwError();
    } else {
      //if it's a number, add it to the displayed result and the formula
      result += num;
      formula += num;
    }
  }
  updateScreen();
}
function addOperator(op) {
  //cannot begin with an operator
  if (screen.innerHTML == "0") {
    throwError();
    //cannot write 2 operators in a row
  } else if (isNaN(formula.slice(-1))) {
    throwError();
  } else {
    //transform x into *
    if (op == "x") {
      formula = formula + "*";
      result = "x";
      updateScreen();
      result = "";
      decimalPossible = true;
      //add the operator to the formula, display on screen, reset decimal
    } else {
      formula = formula + op;
      result = op;
      updateScreen();
      result = "";
      decimalPossible = true;
    }
  }
}
function getResult() {
  //cannot follow an operator
  if (isNaN(parseInt(result))) {
    throwError();
  } else {
    //resolve the formula, display on screen with result, reset result
    result = eval(formula);
    //if decimal, limit to 2 after the dot
    if (result % 1 != 0) {
      screen.textContent = result.toFixed(2);
      result = 0;
      decimalPossible = true;
    } else {
      updateScreen();
      result = 0;
    }
  }
};
function resetAll() {
  result = 0;
  updateScreen();
  formula = "";
}
function deleteOne() {
  if (result.length > 1) {
    result = result.slice(0, -1);
    formula = result;
  } else {
    result = 0;
    formula = "";
  }
  updateScreen();
}
//MOUSE CLICKED NUMBERS
let keysNumber = document.querySelectorAll(".keypad__number");
for (let key of keysNumber) {
  key.addEventListener("click", () => {
    addNumber(key.innerHTML);
  });
}
//MOUSE CLICKED OPERATORS
let keysOperator = document.querySelectorAll(".keypad__operator");
for (let key of keysOperator) {
  key.addEventListener("click", () => {
    addOperator(key.innerHTML);
  });
}
//MOUSE CLICKED EQUAL
document.querySelector("[data-key='Enter']").addEventListener("click", () => {
  getResult();
});
//MOUSE CLICKED DELETE AND RESET
document.querySelector("[data-key='Reset']").addEventListener("click", () => {
  resetAll();
});
document.querySelector("[data-key='Backspace']").addEventListener("click", () => {
  deleteOne();
});
//KEYBOARD
function keyboardAnimation(key) {
  //les touches correspondantes s'animent à l'écran
  document.querySelector("[data-key='" + key + "']").classList.add("clicked");
  setTimeout(() => {
    document.querySelector("[data-key='" + key + "']").classList.remove("clicked");
  }, 150);
}
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  switch (e.key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
    case ".":
      keyboardAnimation(e.key);
      addNumber(e.key);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      keyboardAnimation(e.key);
      addOperator(e.key);
      break;
    case "Enter":
      keyboardAnimation(e.key);
      getResult();
      break;
    case "Backspace":
      keyboardAnimation(e.key);
      deleteOne();
      break;
    default:
      throwError();
      break;
  }
});
