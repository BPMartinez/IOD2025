import { createContext, useContext, useState } from "react";

const MoodContext = createContext();

export function MoodProvider({ children }) {
  const [emoji, setEmoji] = useState("😊");

  const toggleMood = () => {
    setEmoji((prev) => (prev === "😊" ? "😡" : "😊"));
  };

  return (
    <MoodContext.Provider value={{ emoji, toggleMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const ctx = useContext(MoodContext);
  if (!ctx) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return ctx;
}
