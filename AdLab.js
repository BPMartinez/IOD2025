// 1.
// function makeCounter(startFrom = 0, incrementBy = 1) {
//   let currentCount = startFrom;
//   return function() {
//     currentCount += incrementBy;
//     console.log(currentCount);
//     return currentCount;
//   };
// }

// let counter1 = makeCounter(0, 1);
// let counter2 = makeCounter(10, 2);

// counter1(); 
// counter1(); 
// counter2(); 
// counter2(); 
// counter1(); 

// 2.
// const delayMsg = (msg) => {
//   console.log(`This message will be printed after a delay: ${msg}`);
// };

// setTimeout(delayMsg, 100, '#1: Delayed by 100ms');
// setTimeout(delayMsg, 20, '#2: Delayed by 20ms');
// setTimeout(delayMsg, 0, '#3: Delayed by 0ms');
// delayMsg('#4: Not delayed at all'); // immediate


// const timeout5 = setTimeout(delayMsg, 15000, '#5: Delayed by 15 seconds');
// clearTimeout(timeout5);

// 3.
// function debounce(func) {
//   let timerId = null;
//   return function debounced(...args) {
//     const ctx = this;
//     clearTimeout(timerId);
//     timerId = setTimeout(() => func.apply(ctx, args), 1000); 
//   };
// }

// function printMe() {
//   console.log('printing debounced message');
// }
// printMe = debounce(printMe);


// setTimeout(printMe, 100);
// setTimeout(printMe, 200);
// setTimeout(printMe, 300);

// function debounce(func, ms = 1000) {
//   let timerId = null;
//   return function debounced(...args) {
//     const ctx = this;
//     clearTimeout(timerId);
//     timerId = setTimeout(() => func.apply(ctx, args), ms);
//   };
// }

// function printMe() {
//   console.log('printing debounced message (800ms)');
// }
// printMe = debounce(printMe, 800);
// setTimeout(printMe, 100);
// setTimeout(printMe, 200);
// setTimeout(printMe, 300);

// function debounce(func, ms = 1000) {
//   let timerId = null;
//   return function debounced(...args) {
//     const ctx = this;
//     clearTimeout(timerId);
//     timerId = setTimeout(() => func.apply(ctx, args), ms);
//   };
// }

// function printMe(msg) {
//   console.log('printing debounced message:', msg);
// }
// printMe = debounce(printMe, 1000);

// setTimeout(() => printMe('first'), 100);
// setTimeout(() => printMe('second'), 200);
// setTimeout(() => printMe('third'), 300);

// 4.

// function printFibonacci(limit) {
//   let a = 0, b = 1;
//   let count = 1;

//   console.log(b);

//   const timer = setInterval(() => {
//     const next = a + b;
//     console.log(next);
//     a = b;
//     b = next;
//     count++;
//     if (count >= limit) {
//       clearInterval(timer);
//       console.log('Sequence complete! (setInterval version)');
//     }
//   }, 1000);
// }

// printFibonacci(10);
// function printFibonacciTimeouts(limit) {
//   let a = 0, b = 1;
//   let count = 1;

//   console.log(b); 

//   function next() {
//     if (count >= limit) {
//       console.log('Sequence complete! (setTimeout version)');
//       return;
//     }

//     const nextNum = a + b;
//     console.log(nextNum);
//     a = b;
//     b = nextNum;
//     count++;
//     setTimeout(next, 1000);
//   }

//   setTimeout(next, 1000);
// }
// setTimeout(() => printFibonacciTimeouts(8), 12000);

// 5.
// let car = {
// make: "Porsche",
// model: '911',
// year: 1964,

// description() {
// console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
// }
// };
// car.description(); 
// setTimeout(car.description, 200); 

// let car = {
//   make: "Porsche",
//   model: "911",
//   year: 1964,
//   description() {
//     console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
//   }
// };

// car.description();
// setTimeout(() => car.description(), 200);

// const newerCar = { ...car, year: 1967 };   
// setTimeout(() => car.description(), 200);
// car = newerCar; 

// 
// 6.

// Function.prototype.delay = function (ms) {
//   const func = this;
//   return function (...args) {
//     setTimeout(() => func.apply(this, args), ms);
//   };
// };

// function multiply(...nums) {
//   console.log(nums.reduce((prod, n) => prod * n, 1));
// }

// multiply.delay(500)(5, 5);
// multiply.delay(800)(2, 3, 4);
// multiply.delay(1000)(2, 3, 4, 5);

// 7. 

// class DigitalClock {
//   constructor(prefix) {
//     this.prefix = prefix;
//     this.timer = null;
//   }
//   display() {
//     const date = new Date();
//     let [hours, mins, secs] = [date.getHours(), date.getMinutes(), date.getSeconds()];
//     if (hours < 10) hours = '0' + hours;
//     if (mins < 10) mins = '0' + mins;
//     if (secs < 10) secs = '0' + secs;
//     console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
//   }
//   stop() {
//     clearInterval(this.timer);
//     this.timer = null;
//   }
//   start() {
//     this.display();
//     this.timer = setInterval(() => this.display(), 1000);
//   }
// }


// class PrecisionClock extends DigitalClock {
//   constructor(prefix, precision = 1000) {
//     super(prefix);
//     this.precision = precision;
//   }
//   start() {
//     this.display();
//     this.timer = setInterval(() => this.display(), this.precision);
//   }
// }

// class AlarmClock extends PrecisionClock {
//   constructor(prefix, wakeupTime = '07:00', precision = 1000) {
//     super(prefix, precision);
//     this.wakeupTime = AlarmClock.normalizeTime(wakeupTime);
//   }

//   static normalizeTime(hhmm) {

//     const [hRaw = '0', mRaw = '0'] = String(hhmm).split(':');
//     const h = String(parseInt(hRaw, 10)).padStart(2, '0');
//     const m = String(parseInt(mRaw, 10)).padStart(2, '0');
//     return `${h}:${m}`;
//   }

//   display() {
//     const date = new Date();
//     let [hours, mins, secs] = [date.getHours(), date.getMinutes(), date.getSeconds()];
//     const hh = String(hours).padStart(2, '0');
//     const mm = String(mins).padStart(2, '0');
//     const ss = String(secs).padStart(2, '0');

//     console.log(`${this.prefix} ${hh}:${mm}:${ss}`);

//     const currentHHMM = `${hh}:${mm}`;
//     if (currentHHMM === this.wakeupTime) {
//       console.log(`${this.prefix} Wake Up`);
//       this.stop();
//     }
//   }
// }


// const myClock = new DigitalClock('my clock:');
// myClock.start();
// setTimeout(() => myClock.stop(), 3500); // stop after ~3.5s

// const fastClock = new PrecisionClock('fast clock:', 250);
// setTimeout(() => fastClock.start(), 4000);
// setTimeout(() => fastClock.stop(), 5500);


// const nextMinute = (() => {
//   const d = new Date();
//   d.setMinutes(d.getMinutes() + 1);
//   return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
// })();
// const alarm = new AlarmClock('alarm:', nextMinute, 500);
// setTimeout(() => alarm.start(), 6000);

// 8.
// function validateStringArg(fn) {
//   return function (...args) {

//     args.forEach((arg, i) => {
//       if (typeof arg !== 'string') {
//         throw new TypeError(`Argument ${i + 1} must be a string. Received: ${typeof arg}`);
//       }
//     });
//     return fn.apply(this, args);
//   };
// }

// function orderItems(...itemNames) {
//   if (itemNames.length === 0) return 'No items to order.';
//   return `Order placed for: ${itemNames.join(', ')}`;
// }

// const validatedOrderItem = validateStringArg(orderItems);

// try {
//   console.log(validatedOrderItem("Apple Watch")); 
// } catch (e) {
//   console.error("Error:", e.message);
// }

// try {
//   console.log(validatedOrderItem("iPad", "Magic Keyboard", "Apple Pencil")); 
// } catch (e) {
//   console.error("Error:", e.message);
// }

// try {
//   console.log(validatedOrderItem(123)); 
// } catch (e) {
//   console.error("Error:", e.message);
// }

// try {
//   console.log(validatedOrderItem("iPhone 16", 42, "Case"));
// } catch (e) {
//   console.error("Error:", e.message);
// }

// try {
//   console.log(validatedOrderItem()); 
// } catch (e) {
//   console.error("Error:", e.message);
// }

// 9.

// function randomDelay() {
//   return new Promise((resolve, reject) => {

//     const delaySeconds = Math.floor(Math.random() * 20) + 1;
//     const delayMs = delaySeconds * 1000;

//     console.log(`Generated delay: ${delaySeconds} seconds`);

//     setTimeout(() => {

//       if (delaySeconds % 2 === 0) {
//         resolve(delaySeconds);
//       } else {
//         reject(delaySeconds);
//       }
//     }, delayMs);
//   });
// }

// randomDelay()
//   .then((delaySeconds) => {
//     console.log(`Success after ${delaySeconds} seconds: There appears to have been a delay.`);
//   })
//   .catch((delaySeconds) => {
//     console.log(`Failure after ${delaySeconds} seconds: Odd delay encountered — Promise rejected.`);
//   });

// 10.

import fetch from 'node-fetch';
globalThis.fetch = fetch;

async function fetchURLDataAsync(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
}
fetchURLDataAsync('https://jsonplaceholder.typicode.com/todos/1')
  .then(data => console.log(' Valid URL result:', data))
  .catch(error => console.error(' Error (valid URL):', error.message));


fetchURLDataAsync('https://jsonplaceholder.typicode.com/invalid-endpoint')
  .then(data => console.log(' Invalid test result:', data))
  .catch(error => console.error(' Error (invalid URL):', error.message));

  async function fetchMultipleURLs(urls) {
  try {
    const results = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed: ${url} (status ${response.status})`);
        }
        return response.json();
      })
    );
    return results;
  } catch (error) {
    throw new Error(`One or more fetches failed: ${error.message}`);
  }
}

const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/users/1',
  'https://jsonplaceholder.typicode.com/invalid'
];

fetchMultipleURLs(urls)
  .then(results => console.log(' All fetched results:', results))
  .catch(error => console.error(' Error fetching multiple URLs:', error.message));
