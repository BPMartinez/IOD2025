// src/pages/IncomingRequestsPage.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  getCurrentUser,
  fetchInboundRequests,
  updateRequestStatus,
} from "../api/client";

export default function IncomingRequestsPage() {
  const user = getCurrentUser();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

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
      <h2>Requests Sent To Me</h2>
      <p style={{ fontSize: 14, color: "#555" }}>
        These are requests that other families have sent to your family.
      </p>

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
            <h3>{req.purpose || req.type || "Request"}</h3>
            <p>
              <strong>From:</strong>{" "}
              {req.fromUser?.familyName || "Another family"} (
              {req.fromUser?.email || ""})
            </p>
            <p>
              <strong>Child:</strong> {req.childName || ""}
            </p>
            <p>
              <strong>Date:</strong> {req.date || ""}{" "}
              <strong>Time:</strong> {req.time || ""}
            </p>
            <p>
              <strong>Notes:</strong> {req.notes || ""}
            </p>
            <p>
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
