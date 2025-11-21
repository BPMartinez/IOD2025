import { useMood } from "../context/MoodContext";

function Emoji() {
  const { emoji, toggleMood } = useMood();

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>{emoji}</h2>
      <button onClick={toggleMood}>Change Mood</button>
    </div>
  );
}

export default Emoji;
