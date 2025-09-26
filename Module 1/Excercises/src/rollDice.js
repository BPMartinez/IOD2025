function rollDice(sides) {
  if (sides <= 0) throw new Error("Dice must have at least 1 side");
  return Math.floor(Math.random() * sides) + 1;
}


if (typeof module !== "undefined") {
  module.exports = rollDice;
}


if (typeof window !== "undefined") {
  window.rollDice = rollDice;
}
