function doubleOddNumbers(numbers) {
  const newNumbers = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 !== 0) {
      newNumbers.push(numbers[i] * 2);
    }
  }
  return newNumbers;
}

const myNumbers = [1, 2, 3, 4];
console.log(doubleOddNumbers(myNumbers)); // ==> [2, 6]

// rewritten using higher-order functions
const doubleOdd = myNumbers.filter(num => num % 2).map(num => num * 2);
console.log(doubleOdd); // ==> [2, 6]