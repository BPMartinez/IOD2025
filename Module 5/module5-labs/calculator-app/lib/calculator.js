const { randomUUID } = require('crypto');
const logger = require('./Logger');

class Calculator {
  constructor() {
    this.history = [];
  }

  generateId() {
    if (typeof randomUUID === 'function') {
      return randomUUID();
    }

    return Math.random().toString(36).substring(2, 10);
  }

  createRecord(operation, num1, num2, result) {
    const record = {
      id: this.generateId(),   
      operation,
      num1,
      num2,
      result
    };

    this.history.push(record);


    logger.log(`Calculator ${operation} request`, {
      id: record.id,
      num1,
      num2,
      result
    });

    return record;
  }

  add(num1, num2) {
    const result = num1 + num2;
    return this.createRecord('add', num1, num2, result);
  }

  subtract(num1, num2) {
    const result = num1 - num2;
    return this.createRecord('subtract', num1, num2, result);
  }

  multiply(num1, num2) {
    const result = num1 * num2;
    return this.createRecord('multiply', num1, num2, result);
  }

  divide(num1, num2) {
    if (num2 === 0) {

      const error = new Error('Cannot divide by zero');
      error.code = 'DIVIDE_BY_ZERO';
      throw error;
    }

    const result = num1 / num2;
    return this.createRecord('divide', num1, num2, result);
  }

  getHistory() {
    return this.history;
  }
}

module.exports = new Calculator();
