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
const add = function (a, b) {
  return a + b;
};
const substract = function (a, b) {
  return a - b;
};
const divide = function (a, b) {
  return a / b;
};
const multiply = function (a, b) {
  return a * b;
};
const whereToSplit = function (input) {
  for (let i of input) {
    if (isNaN(Number(i))) {
      return i;
    }
    return false;
  }
};
const splitInput = function (input, args = []) {
  splitOn = whereToSplit(input);
  args = input.split(`${splitOn}`);
  return args;
};

const calculator = document.querySelector(".calculator");
const screenContent = calculator.querySelector(".screen-content");
const numpadButtons = Array.from(document.querySelectorAll(".numpad button"));

numpadButtons.reduce(handleButtonStandout, 0);
numpadButtons.forEach((button) => {
  button.addEventListener("click", showInput);
});
