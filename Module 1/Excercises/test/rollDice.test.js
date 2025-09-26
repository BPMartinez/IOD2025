const rollDice = require('../src/rollDice');

test('rollDice returns number between 1 and sides', () => {
  const sides = 6;
  for (let i = 0; i < 100; i++) {
    const result = rollDice(sides);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(sides);
  }
});

test('rollDice throws error for invalid sides', () => {
  expect(() => rollDice(0)).toThrow();
});
