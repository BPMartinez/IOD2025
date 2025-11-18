const request = require('supertest');
const app = require('../app');

describe('Calculator routes', () => {
  test('GET /calc/add should add two numbers', async () => {
    const res = await request(app)
      .get('/calc/add')
      .query({ num1: 10, num2: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.operation).toBe('add');
    expect(res.body.result).toBe(15);
  });

  test('GET /calc/subtract should subtract two numbers', async () => {
    const res = await request(app)
      .get('/calc/subtract')
      .query({ num1: 10, num2: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.operation).toBe('subtract');
    expect(res.body.result).toBe(5);
  });

  test('GET /calc/multiply should multiply two numbers', async () => {
    const res = await request(app)
      .get('/calc/multiply')
      .query({ num1: 6, num2: 7 });

    expect(res.statusCode).toBe(200);
    expect(res.body.operation).toBe('multiply');
    expect(res.body.result).toBe(42);
  });

  test('GET /calc/divide should divide two numbers', async () => {
    const res = await request(app)
      .get('/calc/divide')
      .query({ num1: 20, num2: 4 });

    expect(res.statusCode).toBe(200);
    expect(res.body.operation).toBe('divide');
    expect(res.body.result).toBe(5);
  });

  test('GET /calc/divide should return error on divide by zero', async () => {
    const res = await request(app)
      .get('/calc/divide')
      .query({ num1: 20, num2: 0 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error.toLowerCase()).toContain('divide by zero');
  });

  test('GET /calc/add should return error if num1 or num2 is invalid', async () => {
    const res = await request(app)
      .get('/calc/add')
      .query({ num1: 'abc', num2: 5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error.toLowerCase()).toContain('valid numbers');
  });
});

describe('Extra random route', () => {
  test('GET /extra/random with only max should return number between 0 and max', async () => {
    const res = await request(app)
      .get('/extra/random')
      .query({ max: 10 });

    expect(res.statusCode).toBe(200);
    expect(res.body.operation).toBe('random');
    expect(res.body.min).toBe(0);
    expect(res.body.max).toBe(10);
    expect(res.body.random).toBeGreaterThanOrEqual(0);
    expect(res.body.random).toBeLessThanOrEqual(10);
  });

  test('GET /extra/random with min and max should return number between min and max', async () => {
    const res = await request(app)
      .get('/extra/random')
      .query({ min: 5, max: 15 });

    expect(res.statusCode).toBe(200);
    expect(res.body.min).toBe(5);
    expect(res.body.max).toBe(15);
    expect(res.body.random).toBeGreaterThanOrEqual(5);
    expect(res.body.random).toBeLessThanOrEqual(15);
  });

  test('GET /extra/random without max should return 400 error', async () => {
    const res = await request(app).get('/extra/random');

    expect(res.statusCode).toBe(400);
    expect(res.body.error.toLowerCase()).toContain('max');
  });
});
