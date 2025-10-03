// console.log('hello'); console.log('world');

// const { RedirectHandler } = require("undici-types")

// console.log('hello')
// console.log('world')

// console.log('world') // this comment follows the statement, will be ignored when compiled

// // a comment line

// /* code block comment
// function printConsoleMessage() {
// console.log('I am commented out')
// }
// */

// const integer = 123 // integer - whole number
// const float = 12.345 // floating point - decimal number

// // console.log(1/0) // division by zero = Infinity
// // console.log(-1/0) // negative division by zero = -Infinity
// console.log("not a number" / 1) // invalid mathematical operation = NaN

// let one = 1;
// let two = 2;
// let three = 3;


// console.log(one + two - three * two / one); // -3
// const bigint_valid = 1234567890123456789012345n;
// const bigint_invalid = 1234567890123456789012345; // too large for standard integers

// console.log(bigint_valid == bigint_invalid) // false

// let isChecked = false
// let isToggleOn = true

// let Caron = true
// let Caridle = false

// Caron = !Caron

// console.log(Caron)


// isChecked = !isChecked

// console.log(isChecked)

// let location // no value is assigned with the = operator
// console.log(location); // undefined

// let location2

// let age = null

// console.log(`${location2} == ${age} ? ${location2 == age}`) 

// console.log(`${location2} === ${age} ? ${location2 === age}`)

// const tv = {
//     brand: "Sony Bravia",
//     size: "55 inches",
//     model: 2025,
//     resolution: "4k UHD",
// }
// console.log(tv);
// console.log(tv.brand)

// console.log(typeof undefinded)
// console.log(typeof 0);
// console.log(typeof 10n);
// console.log(typeof true);
// console.log(typeof 'text');
// console.log(typeof Symbol('id'));
// console.log(typeof Math);
// console.log(typeof null);
// console.log(typeof console.log);

// console.log( String(false))
// console.log ("1" + 2 + 3)
// console.log(1 + 2 + "3")

// console.log( Number("  4      "))
// console.log( Number(null))
// console.log ( Number(undefined))
// console.log( Number(false))
// console.log( Number(true))
// console.log( Number(""))
// console.log( Number("not a number"))

// console.log("6" / "2")
// console.log("6" * "2")
// console.log("6" - "2")
// console.log(+"6"+ 5)
// console.log(+"6")

// console.log( Boolean(""))
// console.log( Boolean(0))
// console.log( Boolean(null))
// console.log( Boolean(undefined))
// console.log( Boolean(NaN))
// console.log( Boolean("false"))
// console.log( Boolean(-1))

// console.log( NaN ? 'NaN is true' : 'NaN is false' ) // NaN is false
// console.log( 0 ? 'zero is true' : 'zero is false' ) // zero is false
// console.log( "hello" ? 'hello is true' : 'hello is false' ) // hello is true
// console.log( !undefined )

// console.log( 'bpple' < 'caten')
// console.log( 'eat' < 'eaten')

// console.log("2" > 1)
// console.log("2" !=1)
// console.log( "02" == 2)
// console.log(true == 1)
// console.log(false == 0)
// console.log( null == undefined)

// function helloWorld() {
//     console.log('Hello World')
//     console.log('hows it going?')
// }
// helloWorld()

// function checkAge(age) {
// if (age > 18) {
//     return 'adult'
// }
// return 'non-adult'
// }

// console.log(checkAge(20))
// console.log(checkAge(15))

// const sayHi = function() {
//     console.log('hi')
// }

// sayHi()

// const sayHiArrow = () => console.log("hi")

// sayHiArrow()

// const subtract1 = (a, b) => a - b

// const subtract2 = (a, b) => {return a - b}

// console.log(subtract1(10, 5))
// console.log(subtract2(10, 2))

// const sayHiExpression = function() {
//     console.log('Hi')
//     console.log(arguments)

// }

// function sayHiDeclaration() {
//     console.log('Hi')
//     console.log(arguments)
// }

// const sayHiArrow = () => {
//     console.log('Hi')
//     console.log(arguments)

// }

// sayHiDeclaration()
// sayHiExpression()
// sayHiArrow()

// const user = new Object()

// const user1 = {}

// const user3 = {
//     name: 'joe',
//     age: 20,
//     'has a dog' : true

// }

// console.log(user3)

class User {
constructor(first, last) {
this.first = first;
this.last
}

hasShortName() {
return this.first.length >= 3
}
}
let user2 = new User('Tina', 'Smith')
console.log(user2)
console.log(user2.hasShortName())