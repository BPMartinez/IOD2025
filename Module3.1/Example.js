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

// const sentence = 'The quick brown fox jumps over the lazy dog.';

// console.log(sentence.startsWith('The')) // true - case sensitive
// console.log(sentence.endsWith('dog')) // false - needs the full stop
// console.log(sentence.split(' ')) // splits into multiple strings using the given separator
// // ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog.']
// console.log(sentence.slice(4, 10)) // quick - gets the section between chars 4 and 10
// console.log(sentence.replace('quick', 'slow')) // The slow brown fox jumps over the lazy dog.
// console.log(" extra spaces ".trim()) // extra spaces - trims whitespace from start and end

// const fruits = ['Apple', 'Orange', 'Pear']
// const lastFruit = fruits.pop() 
// console.log(lastFruit); 
// console.log(fruits); 

// fruits.push('Banana')
// console.log(fruits)

// const fruits = ['Apple', 'Orange', 'Pear']
// const firstFruit = fruits.shift() // removes and returns the first item
// console.log(firstFruit) // Apple
// console.log(fruits) // [ 'Orange', 'Pear' ]
// fruits.unshift('Banana') // adds to the beginning of the array
// console.log(fruits) // [ 'Banana', 'Orange', 'Pear' ]

// const fruits1 = ['Apple', 'Orange', 'Pear']
// const fruits2 = fruits1
// fruits1.push('banana')
// console.log(fruits2) 

// console.log('fruit at index 0: ' + fruits1[0])
// console.log('fruit at index 1: ' + fruits1[1])
// console.log('fruit at index 2: ' + fruits1[2])

// const matrix = [
//     [1, 2, 3], // row 0 [0, 1, 2]
//     [4, 5, 6], // row 1 [0, 1, 2]
//     [7, 8, 9] // row 2 [0, 1, 2]
// ]

// console.log(matrix[0][2]) 

// const numbers = [1, 2, 3]
// const strings = ["one", "two", "three"]
// const empyty = []

// console.log('numbers: ' + numbers)
// console.log('strings: ' + strings)
// console.log('empty: ' + empyty)

// const sliceArray = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
// const sliced = sliceArray.slice(0, 3)
// const endSliced = sliceArray.slice(-3)
// console.log(sliced)
// console.log(endSliced)
// console.log(sliceArray)

// const spliceArray = ['I', 'study', 'JavaScript', 'right', 'now']
// const removed = spliceArray.splice(0, 3, "Let's" , "dance")

// console.log(removed) 
// console.log(spliceArray)

// const array1 = [1,2,3]
// const array2 = [4,5,6]
// const array3 = [7,8,9]

// const combined = array1.concat(array2, array3)
// console.log(combined) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
// console.log(combined.concat(10, 11)) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]

// const marks = ['A+', 'C+', 'B-', 'D', 'B+', 'C+', 'B-']

// let bIndex = marks.indexOf('B-')
// let eIndex = marks.indexOf('E')

// // first index is always 0
// console.log(marks[bIndex] + ' is at index: ' + bIndex) // B- is at index: 2
// console.log(eIndex) // -1, since not found

// const marks = ['A+', 'C+', 'B-', 'D', 'B+', 'C+', 'B-']

// let bIndexFirst = marks.indexOf('B-')
// let bIndexLast = marks.lastIndexOf('B-')

// console.log(marks[bIndexFirst] + ' is first at: ' + bIndexFirst) // B- is first at: 2
// console.log(marks[bIndexLast] + ' is last at: ' + bIndexLast) // B- is last at: 6

// const products = [
// { id: 1, title: 'Sleeveless Tee', price: 23.95, category: 'Shirts' },
// { id: 2, title: "Men's Hoodie", price: 54.95, category: 'Winter' },
// { id: 3, title: "Denim Jeans", price: 49.95, category: 'Pants' },
// { id: 4, title: "Ladies Tee", price: 25.95, category: 'Shirts' }
// ]
// // we usually use an arrow function - runs once for each element, returns array of matches
// let shirts = products.filter(product => product.category == 'Shirts')
// let under50 = products.filter(product => product.price < 50)
// console.log(shirts) // 2 matching items in shirts array
// console.log(under50) // 3 matching items in under50 array

// let titles = products.map(product => product.title)
// let h2titles = products.map(product => '<h2>'+product.title+'</h2>')
// let raisedPrices = products.map(product => ({...product, price: product.price + 5}) )
// console.log(titles)

// // console.log(raisedPrices)

// products.sort( (product1, product2) => product1.price - product2.price )
// console.log(products) // original array is modified to new low-high price sorting order: 1,4,3,2

// products.sort( (p1, p2) => p1.title > p2.title ? 1 : -1 )
// console.log(products) // original array is modified to new title sorting order: 3,4,2,1

// const numbers = [4,8,1,5,66,23,41]
// console.log( numbers.sort() ) // [ 1, 23, 4, 41, 5, 66, 8 ] : string comparisons
// console.log( numbers.sort((num1, num2) => num1 - num2) ) // [ 1, 4, 5, 8, 23, 41, 66 ]

// const stringNums = ["1", "81", "41", "102", "35", "1004"]
// console.log( stringNums.sort() ) // [ '1', '1004', '102', '35', '41', '81' ] : string comparisons
// console.log( stringNums.sort((a, b) => a - b) ) // [ '1', '35', '41', '81', '102', '1004' ]

// const stringNums = ["1", "81", "41", "102", "35", "1004"]
// const sortedNums = [...stringNums].sort()
// console.log(stringNums) // [ '1', '81', '41', '102', '35', '1004' ]
// console.log(sortedNums) // [ '1', '1004', '102', '35', '41', '81' ]

// const elements = ['wind', 'fire', 'earth', 'water']
// const reversed1 = elements.reverse()
// const reversed2 = [...elements].reverse()
// console.log(elements)
// console.log(reversed2)

// const products = [
// { id: 1, title: 'Sleeveless Tee', price: 23.95, category: 'Shirts', quanity: 2},
// { id: 2, title: "Men's Hoodie", price: 54.95, category: 'Winter', quanity: 3},
// { id: 3, title: "Denim Jeans", price: 49.95, category: 'Pants', quanity: 5},
// ]
// const totalPrice = products.reduce((currentTotal, currentProduct) => currentTotal + currentProduct.price, 0)
// const totalQty = products.reduce((currentQty, currentProduct) => currentQty + currentProduct.quantity, 0)

// console.log(totalPrice) // 128.85000000000002
// console.log(totalQty) // 10

// const products = [
// { id: 1, title: 'Sleeveless Tee', price: 23.95, category: 'Shirts', quantity: 2 },
// { id: 2, title: "Men's Hoodie", price: 54.95, category: 'Winter', quantity: 3 },
// { id: 3, title: "Denim Jeans", price: 49.95, category: 'Pants', quantity: 5 }
// ]
// // get the titles of all products over $25:
// const over25Titles = products.filter(prod => prod.price > 25).map(prod => prod.title)
// console.log(over25Titles) // [ "Men's Hoodie", 'Denim Jeans' ]

// // list product ids and titles in descending order of price:
// const hiloProducts = [...products].sort((p1, p2) => p1.price - p2.price).reverse()
// .map(prod => ({id: prod.id, title: prod.title}))
// console.log(hiloProducts)
// // [ {id: 2, title: "Men's Hoodie"}, {id: 3, title: 'Denim Jeans'}, {id: 1, title: 'Sleeveless Tee'} ]

// const animalsArr = ['tiger', 'lion', 'elephant', 'giraffe']
// for (let animal of animalsArr) { console.log(animal); } // prints each animal in turn

// // const animalObj = { name: 'tiger', genus: 'panthera', class: 'mammal' }
// // for (let property of animalObj) { console.log(property); } // TypeError: animalObj is not iterable
// console.log(animalsArr)
// const exampleMap = new Map() // create new empty map object
// exampleMap.set(1, 'number one') // 'set' adds a new key-value pair to the map
// exampleMap.set('1', 'string one') // maps support keys of different types
// exampleMap.set(true, 'true') // can have boolean keys
// exampleMap.set({name: 'John'}, {phone: '0412345678'}) // object keys also valid
// exampleMap.set('1', 'second string one') // overwrites previous value if key exists
// console.log(exampleMap.size) // 4 - number of items in the map
// console.log(exampleMap)

// // Map(4) { 1 => 'number one', '1' => 'second string one', true => 'true',
// // { name: 'John' } => { phone: '0412345678' } 
// console.log( exampleMap.get('1') ) // second string one - gets value for matching key
// console.log( exampleMap.get(2) ) // undefined - key doesn't exist so no value
// console.log( exampleMap.has(1) ) // true - key does exist
// console.log( exampleMap.delete(true) ) // true - removes item and returns true if successful

// // exampleMap.clear() // removes all items from map
// console.log( exampleMap ) // Map(0) {}

// const recipeMap = new Map([
// ['flour', '1 cup'],
// ['milk', '1/2 cup'],
// ['eggs', 2],
// ['butter', '50g']
// ])
// for (let ingredient of recipeMap.keys()) {
// console.log(ingredient) // flour, milk, eggs, butter
// }
// for (let quantity of recipeMap.values()) {
// console.log(quantity) // 1 cup, 1/2 cup, 2, 50g
// }
// for (let item of recipeMap) { // same as recipeMap.entries()
// console.log(item) // ['flour', '1 cup'], (and so on)
// }

// const priceMap = new Map([
// ['banana', 1],
// ['pineapple', 2],
// ['watermelon', 5]
// ])

// const priceObject = Object.fromEntries(priceMap)
// console.log(priceObject) // { banana: 1, pineapple: 2, watermelon: 5 }

// const priceObject2 = { banana: 1, pineapple: 2, watermelon: 5 }
// const priceMap2 = new Map(Object.entries(priceObject2))
// console.log(priceMap2) 
// console.log(priceMap2.get('banana'))
// function fetchExternalData(id) {
//     console.log(`fetching data for id: ${id}`)
//     const date = `Data for id: ${id}`
//     return data 
// }
// const cache = new Map()

// function getCachedData(id) {
//     if (cache.has(id)) {
//         return cache.get(id)
//     }
//     const data = fetchExternalData(id)
//     cache.set(id, data)
//     return data
//     }

// console.log( '#1: ' + getCachedData(1)) // fetches data
// console.log( '#2: ' + getCachedData(1))

// const names = new Set(['Pedro', 'Oliver', 'Jack', 'Mateo'])
// names.add('Mateo')
// names.add('Oliver')
// names.add('Bruno')
// console.log(names.size) // 5 - only the unique names
// console.log(names) // Set(5) { 'Pedro', 'Oliver', 'Jack', 'Mateo', 'Bruno' }

// const names = new Set(['Pedro', 'Oliver', 'Jack', 'Mateo'])

// console.log( names.delete('Jack'))
// console.log( names.has('Jack'))
// console.log( names.has('Pedro'))

// const names = new Set(['Pedro', 'Oliver', 'Jack', 'Mateo'])
// for (let name of names) {
// console.log(name)
// }
// names.forEach(name => console.log(name))