let num = 1;
let str = 'stringy';
let obj = { prop: 'value' };
let nul = null;

console.log('The value of my variable num is: ' + num);
console.log('The value of my variable str is: ' + str);
console.log('The value of my variable obj is: ' + JSON.stringify(obj));
console.log('The value of my variable nul is: ' + nul);

console.log('The type of my variables is, in order: number, string, object, null.');

console.log(typeof num);
console.log(typeof str);
console.log(typeof obj);
console.log(typeof nul);

let variableTypeCheck = typeof num === typeof str ? 'The variables num and str are of the same data type' : 'The variables num and str are of different data types';
console.log(variableTypeCheck);

variableTypeCheck = typeof num === typeof obj ? 'The variables num and obj are of the same data type' : 'The variables num and obj are of different data types';
console.log(variableTypeCheck);

variableTypeCheck = typeof obj === typeof nul ? 'The variables obj and nul are of the same data type' : 'The variables obj and nul are of different data types';
console.log(variableTypeCheck + ' and this is a JavaScript bug!');