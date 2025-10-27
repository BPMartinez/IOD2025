// 1.

// "" + 1 + 0
// // 10
// "" - 1 + 0
// // -1
// true + false
// // 1
// !true
// // false
// 6 / "3"
// // 2
// "2" * "3"
// // 6
// 4 + 5 + "px"
// // 9ps
// "$" + 4 + 5
// // $45
// "4" - 2
// // 2
// "4px" - 2
// // NaN
// " -9 " + 5
// //  -9 5
// " -9 " - 5
// // -14
// null + 1
// // 1
// undefined + 1
// // NaN
// undefined == null
// // trus
// undefined === null
// // false
// " \t \n" - 2
// // -2

// console.log('"" + 1 + 0 =', "" + 1 + 0);
// console.log('"" - 1 + 0 =', "" - 1 + 0);
// console.log('true + false =', true + false);
// console.log('!true =', !true);
// console.log('6 / "3" =', 6 / "3");
// console.log('"2" * "3" =', "2" * "3");
// console.log('4 + 5 + "px" =', 4 + 5 + "px");
// console.log('"$" + 4 + 5 =', "$" + 4 + 5);
// console.log('"4" - 2 =', "4" - 2);
// console.log('"4px" - 2 =', "4px" - 2);
// console.log('"  -9  " + 5 =', "  -9  " + 5);
// console.log('"  -9  " - 5 =', "  -9  " - 5);
// console.log('null + 1 =', null + 1);
// console.log('undefined + 1 =', undefined + 1);
// console.log('undefined == null =', undefined == null);
// console.log('undefined === null =', undefined === null);
// console.log('" \\t \\n" - 2 =', " \t \n" - 2);


// 2.

// let three = "3";
// let four = "4";
// let thirty = "30";

// console.log("three + four =", three + four);
// console.log("three * four =", three * four);
// console.log("three / four =", three / four);
// console.log("three - four =", three - four);
// console.log("three < four =", three < four);
// console.log("thirty < four =", thirty < four);

// 3.
// if (0) console.log('#1 zero is true') // does not print 0 is false 
// if ("0") console.log('#2 zero is true') // prints 0 is true
// if (null) console.log('null is true') // does not print null is false
// if (-1) console.log('negative is true') // prints negative is true
// if (1) console.log('positive is true') // prints positive is true

// 4.

// let a = 2, b = 3;
// let result = `${a} + ${b} is `;
// result += (a + b < 10) ? 'less than 10' : 'greater than 10';
// console.log(result);

// 5.
// Function Declaration
// function getGreeting1(name) {
//   return 'Hello ' + name + '!';
// }

// // Function Expression
// const getGreeting2 = function(name) {
//   return 'Hello ' + name + '!';
// };

// // Arrow Function
// const getGreeting3 = (name) => 'Hello ' + name + '!';


// console.log(getGreeting1("Bianca"));  
// console.log(getGreeting2("Bianca"));  
// console.log(getGreeting3("Bianca"));  

// 6.

// const westley = {
//   name: 'Westley',
//   numFingers: 5
// };

// const rugen = {
//   name: 'Count Rugen',
//   numFingers: 6
// };

// const inigo = {
//   firstName: 'Inigo',
//   lastName: 'Montoya',

//   greeting(person) {
//     let greeting = `Hello ${person.name}, my name is ${this.firstName} ${this.lastName}. `;
//     console.log(greeting + this.getCatchPhrase(person));
//   },

//   // Arrow function with ternary operator
//   getCatchPhrase: (person) =>
//     person.numFingers === 6
//       ? "Hello. My name is Inigo Montoya. You killed my father. Prepare to die."
//       : "Nice to meet you."
// };

// inigo.greeting(westley);
// inigo.greeting(rugen);

// 7.

// const basketballGame = {
//   score: 0,
//   fouls: 0,

//   freeThrow() {
//     this.score++;
//     return this;
//   },

//   basket() {
//     this.score += 2;
//     return this;
//   },

//   threePointer() {
//     this.score += 3;
//     return this;
//   },

//   foul() {
//     this.fouls++;
//     return this;
//   },

//   halfTime() {
//     console.log(`Halftime score is ${this.score}, Fouls: ${this.fouls}`);
//     return this;
//   },

//   fullTime() {
//     console.log(`Fulltime score is ${this.score}, Fouls: ${this.fouls}`);
//     return this;
//   }
// };
// // Example 1
// basketballGame
//   .basket()
//   .freeThrow()
//   .freeThrow()
//   .basket()
//   .threePointer()
//   .halfTime()
//   .foul()
//   .foul()
//   .threePointer()
//   .fullTime();

// // Example 2
// basketballGame
//   .foul()
//   .basket()
//   .threePointer()
//   .foul()
//   .halfTime()
//   .freeThrow()
//   .threePointer()
//   .fullTime();
// 8.


// function printCityInfo(city) {
//   console.log(`\n--- City Information ---`);
//   for (let key in city) {
//     console.log(`${key}: ${city[key]}`);
//   }
//}
// const sydney = {
//   name: 'Sydney',
//   population: 5_121_000,
//   state: 'NSW',
//   founded: '26 January 1788',
//   timezone: 'Australia/Sydney'
// };

// // Test function with Sydney
// printCityInfo(sydney);

// const sanAntonio = {
//   name: 'San Antonio',
//   population: 1_472_000,
//   state: 'Texas',
//   founded: 'May 1, 1718',
//   timezone: 'America/Chicago'
// };

// // Test with new city
// printCityInfo(sanAntonio);

// 9.
// let teamSports = ['Hockey', 'Cricket', 'Volleyball'];
// let dog1 = 'Bingo';
// let cat1 = { name: 'Fluffy', breed: 'Siberian' };

// // a) Same reference
// let moreSports = teamSports;
// moreSports.push('Soccer');
// moreSports.unshift('Basketball');

// // b) Primitives are copied by value
// let dog2 = dog1;
// dog2 = 'Charlie';

// // c) Objects are copied by reference
// let cat2 = cat1;
// cat2.name = 'Whiskers';

// // d) Print results
// console.log('teamSports:', teamSports);
// console.log('dog1:', dog1);
// console.log('cat1:', cat1);

// // e) Make independent copies
// moreSports = [...teamSports];
// moreSports.push('Tennis');
// cat2 = { ...cat1 };
// cat2.name = 'Snowball';

// console.log('\nAfter making copies:');
// console.log('teamSports:', teamSports);
// console.log('moreSports:', moreSports);
// console.log('cat1:', cat1);
// console.log('cat2:', cat2);

// 10.
// Constructor Function
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
//   this.human = true;
//   this.canDrive = function() {
//     return this.age >= 16;
//   };
// }

// // a & b) Create two people
// const person1 = new Person('Bianca', 33);
// const person2 = new Person('Angel', 20);

// // c) Print their properties
// console.log(person1);
// console.log(person2);
// console.log(`${person1.name} can drive: ${person1.canDrive()}`);
// console.log(`${person2.name} can drive: ${person2.canDrive()}`);

// // d) Class version
// class PersonClass {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//     this.human = true;
//   }

//   canDrive() {
//     return this.age >= 16;
//   }
// }

// // Create a third person
// const person3 = new PersonClass('Daphne', 8);
// console.log(person3);
// console.log(`${person3.name} can drive: ${person3.canDrive()}`);

