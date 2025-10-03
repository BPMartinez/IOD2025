console.log('Hello Bianca!')

function sayHello() {
    console.log('hello')
}

sayHello()

// example 1
// function sum(a, b) {
    // console.log(a + b)
// }

//sum(5,1)

let helloText = "say Hi"
let check = 4

if (check > 3) {

    let hello = "say Hello"
    console.log(helloText)
}

//console.log(hellotext)

let mountains = ['Everest', 'Fuji', 'Nanga Parbat'];
console.log(mountains[0]); // 'Everest'
console.log(mountains[1]); // 'Fuji'
console.log(mountains[2]); // 'Nanga Parbat'

mountains[1] = 'Kilimanjaro';
console.log(mountains); // [ 'Everest', 'Kilimanjaro', 'Nanga Parbat' ]

// objects in javascript contain keys (or properties) with corresponding values
const user = {
"first_name" : "Bianca",
"last_name" : "Martinez",
"age" : 34,
"followers" : 9
}
// we can access properties with dot notation
console.log(user.first_name); // Sammy
console.log(user.age); // 25
// or with array style square bracket syntax
console.log(user["last_name"]); // Shark
user.followers = 9; // we can also assign new values to object properties
user.location = 'texas'; // or create new properties