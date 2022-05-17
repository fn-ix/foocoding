let favoriteAnimals = ["blowfish", "capricorn", "giraffe"];

favoriteAnimals.push('turtle');
console.log(favoriteAnimals);

favoriteAnimals.splice(1, 0, 'meerkat');
console.log("'meerkat' will be placed at index 1 and since no elements are deleted, the index of those to the right will be increased by 1");
console.log(favoriteAnimals);

console.log('The array has a length of: ' + favoriteAnimals.length);

favoriteAnimals.splice(3, 1);
console.log(favoriteAnimals);

let index = 0;
for (let item of favoriteAnimals) {
  if (item === 'meerkat') {
    console.log("The index of 'meerkat' is: " + index)
  }
  index += 1;
}

// additional method for quickly removing a particular element by its value
favoriteAnimals = favoriteAnimals.filter(word => word !== 'meerkat');
console.log(favoriteAnimals)