document.getElementById("rollBtn").addEventListener("click", () => {
  const sides = parseInt(document.getElementById("dice").value, 10);
  const result = rollDice(sides); // comes from src/rollDice.js
  document.getElementById("result").innerText = `You rolled: ${result}`;
});
