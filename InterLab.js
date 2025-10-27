//1.
// function ucFirstLetters(str) {
//   return str
//     .split(" ")
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// }

// console.log(ucFirstLetters("los angeles"));       
// console.log(ucFirstLetters("new york city"));     
// console.log(ucFirstLetters("san antonio texas")); 
// console.log(ucFirstLetters("hello world"));       

//2.
// function truncate(str, max) {
//   if (str.length > max) {
//     return str.slice(0, max - 3) + '...';
//   } else {
//     return str;
//   }
// }

// console.log(truncate('This text will be truncated if it is too long', 25));
// function truncate(str, max) {
//   return str.length > max ? str.slice(0, max - 3) + '...' : str;
// }

// console.log(truncate('This text will be truncated if it is too long', 25));
// console.log(truncate("Short text", 25)); 

// console.log(truncate("JavaScript is awesome!", 10));

//3.
// const animals = ['Tiger', 'Giraffe'];
// console.log('Initial animals:', animals);


// animals.push('Elephant', 'Zebra');
// console.log('After adding to end:', animals);


// animals.unshift('Lion', 'Monkey');
// console.log('After adding to beginning:', animals);


// animals.sort();
// console.log('After sorting:', animals);


// function replaceMiddleAnimal(newValue) {
//   const middleIndex = Math.floor(animals.length / 2);
//   animals[middleIndex] = newValue;
//   console.log(`Replaced middle animal with ${newValue}:`, animals);
// }
// replaceMiddleAnimal('Koala');


// function findMatchingAnimals(beginsWith) {
//   const lower = beginsWith.toLowerCase();
//   return animals.filter(animal => animal.toLowerCase().startsWith(lower));
// }

// console.log('Animals starting with T:', findMatchingAnimals('t'));
// console.log('Animals starting with G:', findMatchingAnimals('G'));
// console.log('Animals starting with Z:', findMatchingAnimals('z'));

// 4.

// function camelCase(cssProp) {
//   return cssProp
//     .split('-') // split into ["margin", "left"]
//     .map((word, index) =>
//       index === 0 ? word : word[0].toUpperCase() + word.slice(1)
//     )
//     .join('');
// }
// console.log(camelCase('margin-left'));         
// console.log(camelCase('background-image'));   
// console.log(camelCase('display'));            

// function camelCase(cssProp) {
//   const parts = cssProp.split('-');
//   let result = parts[0];

//   for (let i = 1; i < parts.length; i++) {
//     const word = parts[i];
//     result += word[0].toUpperCase() + word.slice(1);
//   }

//   return result;
// }
// console.log(camelCase('margin-left'));         
// console.log(camelCase('background-image'));    
// console.log(camelCase('display'));             

// function camelCase(cssProp) {
//   const parts = cssProp.split('-');
//   let result = '';

//   for (const [index, word] of parts.entries()) {
//     result += index === 0
//       ? word
//       : word[0].toUpperCase() + word.slice(1);
//   }

//   return result;
// }

// console.log(camelCase('font-size'));           
// console.log(camelCase('border-top-left'));     

// function camelCase(cssProp) {
//   return cssProp
//     .split('-')
//     .map((word, i) =>
//       i === 0 ? word : word[0].toUpperCase() + word.slice(1)
//     )
//     .join('');
// }

// console.log(camelCase('margin-left'));         
// console.log(camelCase('background-image'));    
// console.log(camelCase('display'));             


// function camelCase(cssProp) {
//   const parts = cssProp.split('-');
//   let result = parts[0];

//   for (let i = 1; i < parts.length; i++) {
//     const word = parts[i];
//     if (word) {
//       result += word[0].toUpperCase() + word.slice(1);
//     }
//   }

//   return result;
// }
// console.log(camelCase('margin-left')); 
// console.log(camelCase('background-image'));
// console.log(camelCase('border-top-left'));
// console.log(camelCase('display'));

// 5.

// let fixedTwenty = twentyCents.toFixed(2);
// let fixedTen = tenCents.toFixed(2);
// console.log(fixedTwenty + fixedTen);

// let twentyCents = 0.20;
// let tenCents = 0.10;

// let fixedTwenty = twentyCents.toFixed(2);
// let fixedTen = tenCents.toFixed(2);
// console.log(fixedTwenty + fixedTen);

// function currencyAddition(float1, float2) {
//   const F = 100; 
//   const a = Math.round(float1 * F);
//   const b = Math.round(float2 * F);
//   return (a + b) / F;
// }

// console.log(currencyAddition(0.1, 0.2)); 
// console.log(0.3 == currencyAddition(0.1, 0.2)); 

// function currencyOperation(float1, float2, operation) {
//   const d = 2;
//   const F = 10 ** d;
//   const A = Math.round(float1 * F);
//   const B = Math.round(float2 * F);

//   switch (operation) {
//     case '+':
//       return (A + B) / F;
//     case '-':
//       return (A - B) / F;
//     case '*':
   
//       return (A * B) / (F * F);
//     case '/':

//       return Math.round((A / B) * F) / F;
//     default:
//       throw new Error("operation must be one of '+', '-', '*', '/'");
//   }
// }

// console.log(currencyOperation(0.1, 0.2, '+'));
// console.log(0.3 == currencyOperation(0.1, 0.2, '+')); 
// console.log(currencyOperation(0.3, 0.2, '-')); 
// console.log(currencyOperation(1.23, 4.56, '*')); 
// console.log(currencyOperation(1, 3, '/')); 

// function currencyOperationExt(float1, float2, operation, numDecimals = 2) {
//   if (!(numDecimals >= 1 && numDecimals <= 10 && Number.isInteger(numDecimals))) {
//     throw new Error('numDecimals must be an integer between 1 and 10');
//   }

//   const F = 10 ** numDecimals;
//   const A = Math.round(float1 * F);
//   const B = Math.round(float2 * F);

//   let result;
//   switch (operation) {
//     case '+':
//       result = (A + B) / F;
//       break;
//     case '-':
//       result = (A - B) / F;
//       break;
//     case '*':
//       result = (A * B) / (F * F);
//       break;
//     case '/':
//       result = Math.round((A / B) * F) / F;
//       break;
//     default:
//       throw new Error("operation must be one of '+', '-', '*', '/'");
//   }
//   return result;
// }

// console.log(currencyOperationExt(0.1, 0.2, '+', 2)); 
// console.log(currencyOperationExt(1/3, 0, '+', 4));   
// console.log(currencyOperationExt(2.005, 0, '+', 2)); 

// 6.

// function unique(duplicatesArray) {
//   return [...new Set(duplicatesArray)];
// }
// const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'red', 'blue', 'yellow'];
// const testScores = [55, 84, 97, 63, 55, 32, 84, 91, 55, 43];
// const kids = ['daphne', 'allister', 'daphne', 'atticus', 'allister', 'aria'];

// console.log(unique(colors));
// console.log(unique(testScores));
// console.log(unique(kids));

// 7.

// const books = [
//   { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
//   { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
//   { id: 3, title: '1984', author: 'George Orwell', year: 1949 },
//   { id: 4, title: 'Brave New World', author: 'Aldous Huxley', year: 1932 },
//   { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951 },
// ];

// function getBookTitle(bookId) {
//   const book = books.find(b => b.id === bookId);
//   return book ? book.title : 'Book not found';
// }
// console.log(getBookTitle(3));


// function getOldBooks() {
//   return books.filter(b => b.year < 1950);
// }
// console.log(getOldBooks());


// function addGenre() {
//   return books.map(b => ({ ...b, genre: 'classic' }));
// }
// console.log(addGenre());

// function getTitles(authorInitial) {
//   return books
//     .filter(b => b.author.toLowerCase().startsWith(authorInitial.toLowerCase()))
//     .map(b => b.title);
// }
// console.log(getTitles('G'));
// console.log(getTitles('H'));

// function latestBook() {
//   let latest = books[0];
//   books.forEach(b => {
//     if (b.year > latest.year) latest = b;
//   });
//   return latest;
// }
// console.log(latestBook());

// 8.

// const phoneBookABC = new Map();
// phoneBookABC.set('Annabelle', '0412312343');
// phoneBookABC.set('Barry', '0433221117');
// phoneBookABC.set('Caroline', '0455221182');


// const phoneBookDEF = new Map([
//   ['Daniel', '0477889900'],
//   ['Ella', '0422333444'],
//   ['Frank', '0499555666']
// ]);


// phoneBookABC.set('Caroline', '0400000000');


// function printPhoneBook(contacts) {
//   console.log('\nPhone Book:');
//   for (let [name, number] of contacts) {
//     console.log(`${name}: ${number}`);
//   }
// }

// printPhoneBook(phoneBookABC);
// printPhoneBook(phoneBookDEF);

// const phoneBook = new Map([...phoneBookABC, ...phoneBookDEF]);

// console.log('\nFull list of names in combined phoneBook:');
// for (let name of phoneBook.keys()) {
//   console.log(name);
// }

// 9.
// let salaries = {
//   "Timothy" : 35000,
//   "David" : 25000,
//   "Mary" : 55000,
//   "Christina" : 75000,
//   "James" : 43000
// };

// function sumSalaries(salaries) {
//   return Object.values(salaries).reduce((total, salary) => total + salary, 0);
// }

// console.log("Total Salaries: $" + sumSalaries(salaries));

// function topEarner(salaries) {
//   let highestName = null;
//   let highestSalary = 0;

//   for (let [name, salary] of Object.entries(salaries)) {
//     if (salary > highestSalary) {
//       highestSalary = salary;
//       highestName = name;
//     }
//   }

//   return highestName;
// }
// console.log("Top Earner: " + topEarner(salaries));

// 10

const today = new Date();
console.log('Current time is ' + today.toLocaleTimeString());
console.log(today.getHours() + ' hours have passed so far today');

const minutesPassed = today.getHours() * 60 + today.getMinutes();
console.log(minutesPassed + ' minutes have passed so far today');

const secondsPassed = (today.getHours() * 3600) + (today.getMinutes() * 60) + today.getSeconds();
console.log(secondsPassed + ' seconds have passed so far today');

const birthDate = new Date('1991-06-26');
const now = new Date();

let years = now.getFullYear() - birthDate.getFullYear();
let months = now.getMonth() - birthDate.getMonth();
let days = now.getDate() - birthDate.getDate();

if (days < 0) {
  months--;
  const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  days += prevMonth.getDate();
}
if (months < 0) {
  years--;
  months += 12;
}

console.log(`I am ${years} years, ${months} months and ${days} days old.`);

function daysInBetween(date1, date2) {
  const oneDay = 1000 * 60 * 60 * 24;
  const diffTime = Math.abs(date2 - date1);
  return Math.floor(diffTime / oneDay);
}

console.log('Days between 1 Jan 2020 and today: ' + daysInBetween(new Date('2020-01-01'), today));
