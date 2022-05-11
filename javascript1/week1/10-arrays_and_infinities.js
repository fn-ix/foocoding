console.log('Can we store values of different data types in a single array?')
let arr = [2, { prop: 'val' }, 'stringy']
console.log(arr);
console.log('Yes we can!');

console.log('Can we compare infinities?');
let isComparable = 6 / 0 === 10 / 0;
console.log(isComparable);
console.log(6 / 0, 10 / 0);
console.log('Yes we can! The values of both 6/10 and 10/0 are both exactly Infinity.');

console.log(6 / 0 === undefined);
console.log('However, the value of dividing by zero is not undefined in JavaScript as in pure arithmetic – instead, it is defined as the limit of 6/x as x approaches 0.');

console.log(6 / -0);
console.log('The sign of 0 evidently even preserves the handedness of the limit operation, as the left hand limit (approaching 0 from negative numbers) of division by zero is negative infinity.');