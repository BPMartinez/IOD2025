const { randomUUID } = require('crypto');

class Logger {
  constructor() {
    this.logs = [];
  }

  generateId() {
    if (typeof randomUUID === 'function') {
      return randomUUID();
    }
 
    return Math.random().toString(36).substring(2, 10);
  }

  log(message, meta = {}) {
    const entry = {
      id: this.generateId(),
      message,
      meta,
      timestamp: new Date().toISOString()
    };

    this.logs.push(entry);

   
    console.log(`[LOG ${entry.timestamp}] ${message}`, meta);

    return entry;
  }

  getLogs() {
    return this.logs;
  }
}

module.exports = new Logger();
