// 1 – sum of three
function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

console.log(sumThree(2, 5, 8));

// 2 – colorCar
function colorCar(col) {
  return 'a ' + col + ' car';
}

console.log(colorCar('red'));

// 3 – object as parameter
let object = { key1: 'value1', key2: ['value2'], key3: 3 };

function printObj(obj) {
  return obj;
}

console.log(object);

// 4 – vehicleType
function vehicleType(col, code) {
  if (code === 1) {
    code = 'car';
  }
  if (code === 2) {
    code = 'motorbike';
  }
  return 'a ' + col + ' ' + code;
}

console.log(vehicleType('black', 2));

// 5 – turn if block to ternary expression
3 === 3 ? console.log("yes") : console.log("no");

// 6 – vehicle and age
function vehicle(col, code, age) {
  if (code === 1) {
    code = 'car';
  }
  if (code === 2) {
    code = 'motorbike';
  }
  if (age !== 0) {
    age = 'used';
  }
  return 'a ' + col + ' ' + age + ' ' + code;
}

console.log(vehicle("blue", 1, 5));

// 7 – vehicle list (array)
let vehicleList = ['motorbike', 'caravan', 'bike', 'car'];

// 8 – array index retrieval
console.log(vehicleList[2]);

// 9 – vehicle function using vehicleList array, function expression to escape global scope
vehicle = function (col, code, age) {
  if (code === 1) {
    code = vehicleList[3];
  }
  if (code === 2) {
    code = vehicleList[0];
  }
  if (code === 3) {
    code = vehicleList[2];
  }
  if (age !== 0) {
    age = 'used';
  }
  return 'a ' + col + ' ' + age + ' ' + code;
};

console.log(vehicle("green", 3, 1));

// 10 – advertisement from array concatenation with for loop
function ad() {
  let ad = "Amazing Joe's Garage, we service ";
  for (let i = 0; i < vehicleList.length - 2; i++) {
    ad += vehicleList[i] + 's, ';
  }
  ad += vehicleList[vehicleList.length - 2] + 's and ' + vehicleList[vehicleList.length - 1] + 's.';
  return ad;
}

console.log(ad());

// 11 – expand vehicleList, check if ad still works
vehicleList.push('speedboat');
console.log(ad());

// 12 – empty object
let emptyObject = {};

// 13 – teacher object
let teachers = {
  ment1: 'Claudiu',
  ment2: 'Seif',
  ment3: 'Şahin',
}

// 14 – add property to object
teachers['langs'] = 'HTML, CSS & JavaScript';

// 15 – testing array equality
let x = [1, 2, 3];
let y = [1, 2, 3];
let z = y;

console.log("x == y should be true as both arrays get converted to identical strings which are then compared, whereas x === y will be false, because x and y are separate arrays, thus containing separate memory addresses. z == y and z == x should both be true as both compare identical strings.");

console.log(x == y);
console.log(x === y);
console.log(z == y);
console.log(z == x);

console.log("Was mistaken: apparently objects only get converted to primitives if one of the operands of == is a primitive, otherwise == compares object references just like ===. In that case, x == y would naturally be false due to being distinct arrays, and the same for z == x, as it effectively performs the former comparison.");

// 16 – how variables containing object references work
let o1 = { foo: "bar" };
let o2 = { foo: "bar" };
let o3 = o2;

o2['lorem'] = 'ipsum';
console.log(o2);
console.log(o3);
console.log("Object o3 is changed, as it only contains the reference to the same object in heap memory as object o2.")

o2 = { lorem: 'ipsum' };
console.log(o2);
console.log(o3);
console.log("Object o3 isn't changed, as it still contains the address to the old o2 object, while the address of the new o2 object has changed.");

console.log("Changing o1 has absolutely no bearing on o3 as there is no relationship between them. o1 and o2 hold identical contents, but are distinct objects due to pointing to separate memory locations.");

console.log("Changing 'let o3 = o2' for 'let o2 = o3' is nonsensical, since o2 is already declared and even if the keyword let was removed so that the statement becomes only an assignment, as o3 is not declared, JS will throw an error.");

// 17 - type coercion
function typ() {
  let bar = 42;
  return typeof typeof bar;
}

console.log("The function should return string, as 'typeof bar' returns 'number', which is a string.");
console.log(typ());