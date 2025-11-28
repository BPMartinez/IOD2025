import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

export default function Navbar() {
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/auth");
  }

  return (
    <header className="nav-header">
      <div className="nav-left">
        <Link to="/home" className="brand">
          Besties
        </Link>
      </div>
      <nav className="nav-right">
        {currentUser ? (
          <>
            <span className="nav-user">
              {currentUser.familyName} ({currentUser.email})
            </span>
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/request" className="nav-link">
              Request
            </Link>
            <Link to="/my-requests" className="nav-link">
              My Requests
            </Link>
            <Link to="/requests-to-me" className="nav-link">
              Requests Sent To Me
            </Link>
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth" className="nav-link">
            Login / Sign Up
          </Link>
        )}
      </nav>
    </header>
  );
}
