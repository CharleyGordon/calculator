// import handleCalculation from "./calculator";
class Priority {
  constructor(...args) {
    for (let i of args) {
      this[i] = i;
    }
  }
}
let clicks = 0;
const matchString = "[0-9]";
const matchSign = "[+-*/:]";
let div = new Priority("/", ":");
let multi = new Priority("*", "x");
const add = function (a, b) {
  return a + b;
};
const divide = function (a, b) {
  return a / b;
};
const multiply = function (a, b) {
  return a * b;
};
const toPercent = function (string) {
  return string.replaceAll("%", "/100");
};
const fixSum = function (sum, fix = 4) {
  console.log(typeof sum);
  if (parseInt(sum) === sum) return sum;
  while (fix > 1) {
    sum = Number(sum.toFixed(fix));
    fix--;
  }
  return sum;
};
// slice every expression given in string
const giveInstructions = function (string, toDo = []) {
  for (let i of string) {
    if (isNaN(Number(i)) && i !== ".") {
      toDo.push(i);
    }
  }

  return toDo;
};
// now replace each expression (you now can access them by array)
const replaceExpression = function (string) {
  array = giveInstructions(string);
  for (let i of array) {
    string = string.replace(i, "|");
  }
  numList = string.split("|");
  numList.map((item) => {
    return Number(item);
  });
  return numList;
};
const noEmptySpaces = function (item) {
  if (item === "") return false;
  return true;
};
// now set priority to every division / multiplication
const setPriority = function (string) {
  instructionArray = giveInstructions(string);
  numbersArray = replaceExpression(string);
  for (let i of instructionArray) {
    if (i in multi || i in div) {
      option = i in multi ? "multiply" : "divide";
      position = instructionArray.indexOf(i);
      firstNumber = numbersArray[position];
      lastNumber = numbersArray[position + 1];
      switch (option) {
        case "multiply": {
          numbersArray[position] = multiply(firstNumber, lastNumber);
          break;
        }
        case "divide": {
          numbersArray[position] = divide(firstNumber, lastNumber);
          break;
        }
      }
      instructionArray[position] = numbersArray[position + 1] = "";
      instructionArray = instructionArray.filter(noEmptySpaces);
      numbersArray = numbersArray.filter(noEmptySpaces);
    }
  }
  return [instructionArray, numbersArray];
};
// now shift the first value and handle calculation for each expression
const handleCalculation = function (string) {
  console.log(string);
  if (string === "=") return;
  if (string.match("[0-9]+[$/:]+0")) return "can't divide by 0";
  if (string.match("[0-9][:*/]=")) return string.slice(0, -1);
  string = toPercent(string);
  array = setPriority(string);
  [instruction, numbers] = array;
  iLen = instruction.length;
  nLen = numbers.length;
  firstNumber = Number(numbers.shift());
  for (let i in instruction) {
    if (instruction[i] === "-") {
      numbers[i] = Number(`-${numbers[i]}`);
    }
  }
  sum = numbers.reduce((total, current) => {
    if (isFinite(Number(current))) {
      return Number(total) + Number(current);
    }
    return total;
  }, 0);
  sum += firstNumber;
  sum = fixSum(sum);
  // last instruction is "="; checking if user typed something like "2+2-":
  toMuch = iLen - 1 === nLen ? true : false;
  if (toMuch) {
    sum = `${sum}${instruction[instruction.length - 2]}`;
  }
  sum = `${sum}`.replace("Infinity", "Error");
  sum = `${sum}`.replace("NaN", "Error");
  // enableDot();
  return sum;
};

const handleButtonStandout = function (sum, button) {
  if (isFinite(Number(button.textContent))) return;
  button.classList.add("standout");
};
const showInput = function (e) {
  if (e.target.textContent !== "AC") {
    buttonContent = e.target.textContent;
    screenContent.textContent += buttonContent;
  } else screenContent.textContent = "";
};

const calculator = document.querySelector(".calculator");
const screenContent = calculator.querySelector(".screen-content");
const numpadButtons = Array.from(document.querySelectorAll(".numpad button"));
const equals = calculator.querySelector(".equals");
const dot = calculator.querySelector(".dot");
numpadButtons.reduce(handleButtonStandout, 0);
numpadButtons.forEach((button) => {
  button.addEventListener("click", showInput);
});
const disableDot = function () {
  if (dot.hasAttribute("disabled")) return;
  screenContent.textContent += ".";
  dot.setAttribute("disabled", "");
};
const enableDot = function () {
  dot.removeAttribute("disabled");
};
equals.addEventListener("click", () => {
  calculation = handleCalculation(screenContent.textContent);
  screenContent.textContent = calculation;
});
let pattern = "1234567890-=plustimes%/BackspaceEnter.";
window.addEventListener("keydown", (e) => {
  let key = e.key.toString();

  if (key === "+") {
    key = "plus";
  }
  if (key === "*") {
    key = "times";
  }
  if (key === "Enter") {
    return (screenContent.textContent = handleCalculation(
      screenContent.textContent
    ));
  }
  if (key === ".") {
    return disableDot();
  }
  console.log(key);
  if (pattern.match(key)) {
    if (key === "Backspace") {
      screenContent.textContent = screenContent.textContent.slice(0, -1);
      if (screenContent.textContent.indexOf(".") < 0) enableDot();
      return;
    }
    key = key.replace("plus", "+");
    key = key.replace("times", "*");
    screenContent.textContent += key;
  }
});
