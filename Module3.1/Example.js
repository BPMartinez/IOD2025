// const n = 1.2345
// console.log(n.toFixed(2))
// console.log(n.toPrecision(10))

// const hello = 'hello world' 
// console.log(hello.toUpperCase())
// console.log(hello.endsWith('world'))

// example 1- slide 5
// const user = {
//     name: 'John';
// }
// console.log("User: " + user);

// // example 2 - slide 5
// const user = {
//     name: 'John',
//     toString() {
//         return this.name}
//     }

// const apple = {
//     name: 'Apple',
//     category: 'Granny Smith',
//     price: 1.2,
//     valueOf() {
//         return this.price
//     }

//     }
//     console.log(apple * 2)

// const billion1 = 1000000000 // 9 zeros - hard to read
// const billion2 = 1_000_000_000 // easier to read,
// underscores ignored
// const billion3 = 1e9 // exponential format

// console.log(billion1 === billion2) // true
// console.log(billion2 === billion3) // true

// const microSecs1 = 0.000001 // 6 decimal places - hard
// to read
// const microSecs2 = 0.000_001 // easier to read,
// underscores ignored
// const microSecs3 = 1.e-6 // exponential format

// console.log(microSecs1 === microSecs2) // true
// console.log(microSecs2 === microSecs3) // true

// const r = 0xff;
// const g = 0xff;
// const b = 0xff;

// const white = `rgb(${r}, ${g}, ${b})`
// console.log(white) // rgb(255, 255, 255)

// const mobile = 041234567
// console.log(mobile) // 8730999 - decimal equivalent

// const binary = 0b11111111 // binary form of 255
// const octal = 0o377 // octal form of 255

// console.log(binary) // 255
// console.log(binary === octal) // true

const sentence = 'The quick brown fox jumps over the lazy dog.';

console.log(sentence.startsWith('The')) // true - case sensitive
console.log(sentence.endsWith('dog')) // false - needs the full stop
console.log(sentence.split(' ')) // splits into multiple strings using the given separator
// ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog.']
console.log(sentence.slice(4, 10)) // quick - gets the section between chars 4 and 10
console.log(sentence.replace('quick', 'slow')) // The slow brown fox jumps over the lazy dog.
console.log(" extra spaces ".trim()) // extra spaces - trims whitespace from start and end