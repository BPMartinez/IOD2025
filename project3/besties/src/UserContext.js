import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const email = localStorage.getItem("currentUserEmail");
    if (email) {
      setCurrentUserEmail(email);
    }
  }, []);

  // Whenever email changes, load full user object
  useEffect(() => {
    if (!currentUserEmail) {
      setCurrentUser(null);
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((u) => u.email === currentUserEmail) || null;
    setCurrentUser(found);
  }, [currentUserEmail]);

  function login(email) {
    localStorage.setItem("currentUserEmail", email);
    setCurrentUserEmail(email);
  }

  function logout() {
    localStorage.removeItem("currentUserEmail");
    setCurrentUserEmail(null);
    setCurrentUser(null);
  }

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
