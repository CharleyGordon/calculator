class Priority {
  constructor(...args) {
    for (let i of args) {
      this[i] = i;
    }
  }
}
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
// slice every expression given in string
const giveInstructions = function (string, toDo = []) {
  for (let i of string) {
    if (isNaN(Number(i))) {
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
    }
  }
  instructionArray = instructionArray.filter(noEmptySpaces);
  numbersArray = numbersArray.filter(noEmptySpaces);
  return [instructionArray, numbersArray];
};
// now shift the first value and handle calculation for each expression
const handleCalculation = function (string) {
  console.log(string);
  array = setPriority(string);
  [instruction, numbers] = array;
  firstNumber = Number(numbers.shift());
  for (let i in instruction) {
    if (instruction[i] === "-") {
      numbers[i] = Number(`-${numbers[i]}`);
    }
  }
  sum = numbers.reduce((total, current) => {
    return Number(total) + Number(current);
  }, 0);
  sum += firstNumber;
  return sum;
};
export default handleCalculation;
