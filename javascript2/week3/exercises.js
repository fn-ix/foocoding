// 2.1 - callback function
function foo(func) {
  func();
}

function bar() {
  console.log('Hello, I am bar!');
}

foo(bar);

// 2.2 - conditional callbacks on array from range
function threeFive(startIndex, stopIndex, threeCallback, fiveCallback) {
  const numbers = Array.from({ length: stopIndex - startIndex + 1 }, (_, i) => startIndex + (i));

  numbers.forEach(num => {
    num % 3 || threeCallback(num);
    num % 5 || fiveCallback(num);
  });
}

function sayThree(num) {
  console.log(`My value is ${num} and I am divisible by 3!`);
}

function sayFive(num) {
  console.log(`My value is ${num} and I am divisible by 5!`);
}

threeFive(10, 15, sayThree, sayFive);

// 2.3 - three ways to repeat a string
// 2.3.1 - for loop
function repeatStringFor(str, num) {
  let out = '';
  for (let i = 0; i < num; i++) {
    out += str;
  }
  console.log(out);
}

repeatStringFor('abc', 3);

// 2.3.2 - while loop
function repeatStringWhile(str, num) {
  let out = '';
  let i = 0;
  while (i < num) {
    out += str;
    i++;
  }
  console.log(out);
}

repeatStringWhile('abc', 3);

// 2.3.3 - do...while loop
function repeatStringDoWhile(str, num) {
  let out = '';
  let i = 0;
  do {
    out += str;
    i++;
  } while (i < num);
  console.log(out);
}

repeatStringDoWhile('abc', 3);

// 2.4  - using constructor to create object
function Dog() {
  this.name = "Rex";
  this.color = "black-brown";
  this.numLegs = 4;
}

let kommissar = new Dog();
console.log(kommissar);

// 2.5 - nested for loops
function multiplyAll(arr) {
  let product = 1;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      product *= arr[i][j];
    }
  }
  return product;
}

console.log(multiplyAll([[1, 2], [3, 4], [5, 6, 7]]));

// 2.6 - flattening an array of an arbitrary dimension
let multidimArray = [[1, 2, [15, 33]], [3, 4, [5, [6, 3, [97, 13]]]]];
let flatArray = [];

multidimArray.forEach(element => flatArray = flatArray.concat(element));

while (flatArray.filter(element => typeof element === 'object').length !== 0) {
  const flatArrayLength = flatArray.length;
  multidimArray = flatArray;
  multidimArray.forEach(element => flatArray = flatArray.concat(element));
  flatArray.splice(0, flatArrayLength);
}

console.log(flatArray);

// 2.7 - primitives vs objects
const x = 9;
function f1(val) {
  val = val + 1;
  return val;
}
f1(x);
console.log(x);

const y = { x: 9 };
function f2(val) {
  val.x = val.x + 1;
  return val;
}
f2(y);
console.log(y);

// Explanation: f1 operates directly on the primitive variable passed to it as an argument, whereas f2 operates on the value of the property 'x' of the object variable that is passed to the function as an argument.

// 3 - scope and closures
function createBase(base) {
  function addToBase(add) {
    return base + add;
  }
  return addToBase;
}

const addSix = createBase(6);
console.log(addSix(10)); // returns 16
console.log(addSix(21)); // returns 27

// 3 bonus – filter out repeating values from array
const nonUniqueArray = ['a', 'b', 'c', 'd', 'a', 'e', 'f', 'c'];

function makeUnique(arr) {
  return arr.filter((val, ind, arr) => ind === arr.indexOf(val));
}

console.log(makeUnique(nonUniqueArray));