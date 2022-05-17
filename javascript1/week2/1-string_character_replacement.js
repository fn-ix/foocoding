let myString = "hello,this,is,a,difficult,to,read,sentence";
console.log(myString);

let myStringLength = myString.length;
let myNewString = '';

for (let i = 0; i < myStringLength; i++) {
  if (myString[i] === ',') {
    myNewString += ' ';
  }
  else {
    myNewString += myString[i];
  }
}

myString = myNewString;
console.log(myString);