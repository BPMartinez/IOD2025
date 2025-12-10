// src/pages/IncomingRequestsPage.jsx
import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  getCurrentUser,
  fetchInboundRequests,
  updateRequestStatus,
  clearAuth,
} from "../api/client";

export default function IncomingRequestsPage() {
  const user = getCurrentUser();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const data = await fetchInboundRequests();
        setRequests(data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Could not load inbound requests.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div style={{ maxWidth: 900, margin: "30px auto", padding: "0 16px" }}>
        <p>Loading inbound requests...</p>
      </div>
    );
  }

  const handleLogout = () => {
    clearAuth();
    window.location.href = "/auth";
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateRequestStatus(id, status);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error(err);
      alert("Could not update status.");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "30px auto", padding: "0 16px" }}>
      {/* Header to match Home/MyRequests */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 style={{ marginBottom: 4 }}>Requests Sent To Me</h2>
          <p style={{ fontSize: 13, color: "#555", margin: 0 }}>
            These are requests that other families have sent to your family.
          </p>
          <div style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
            {user.familyName} · {user.email}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link to="/request" style={linkBtn}>
            New Request
          </Link>
          <Link to="/requests" style={linkBtn}>
            Hangouts
          </Link>
          <Link to="/incoming" style={linkBtn}>
            Requests To Me
          </Link>
          <button onClick={handleLogout} style={logoutBtn}>
            Log Out
          </button>
        </div>
      </header>

      {error && (
        <div
          style={{
            background: "#ffe0e0",
            color: "#b30000",
            padding: "8px 10px",
            borderRadius: 6,
            fontSize: 13,
            marginBottom: 10,
          }}
        >
          {error}
        </div>
      )}

      {requests.length === 0 ? (
        <p>No incoming requests yet.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              {req.purpose || req.type || "Request"}
            </h3>
            <p style={{ fontSize: 14, margin: "4px 0" }}>
              <strong>From:</strong>{" "}
              {req.fromUser?.familyName || "Another family"} (
              {req.fromUser?.email || ""})
            </p>
            {req.childName && (
              <p style={{ fontSize: 14, margin: "4px 0" }}>
                <strong>Child:</strong> {req.childName}
              </p>
            )}
            {(req.date || req.time) && (
              <p style={{ fontSize: 14, margin: "4px 0" }}>
                <strong>Date:</strong> {req.date || "TBA"}{" "}
                <strong>Time:</strong> {req.time || "TBA"}
              </p>
            )}
            {req.notes && (
              <p style={{ fontSize: 14, margin: "4px 0" }}>
                <strong>Notes:</strong> {req.notes}
              </p>
            )}
            <p style={{ fontSize: 14, margin: "4px 0" }}>
              <strong>Status:</strong> {req.status || "pending"}
            </p>
            <div style={{ marginTop: 10 }}>
              <button
                style={acceptBtn}
                onClick={() => handleStatusChange(req._id, "accepted")}
              >
                Accept
              </button>
              <button
                style={declineBtn}
                onClick={() => handleStatusChange(req._id, "declined")}
              >
                Decline
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const linkBtn = {
  textDecoration: "none",
  padding: "6px 10px",
  borderRadius: 6,
  border: "1px solid #fb9dd0ff",
  background: "#fff",
  color: "#fb9dd0ff",
  fontSize: 13,
  fontWeight: 600,
};

const logoutBtn = {
  padding: "6px 10px",
  borderRadius: 6,
  border: "none",
  background: "#d9534f",
  color: "#fff",
  fontSize: 13,
  cursor: "pointer",
};

const cardStyle = {
  background: "#fff",
  padding: 16,
  borderRadius: 10,
  marginTop: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const acceptBtn = {
  padding: "6px 10px",
  marginRight: 8,
  borderRadius: 6,
  border: "none",
  background: "#4CAF50",
  color: "white",
  cursor: "pointer",
};

const declineBtn = {
  padding: "6px 10px",
  borderRadius: 6,
  border: "none",
  background: "#d9534f",
  color: "white",
  cursor: "pointer",
};
