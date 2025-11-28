// src/pages/MyRequestsPage.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  getCurrentUser,
  fetchMyRequests,
  updatePlaydateInfo,
} from "../api/client";

export default function MyRequestsPage() {
  const user = getCurrentUser();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      try {
        const data = await fetchMyRequests();
        setRequests(data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Could not load requests.");
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
        <p>Loading requests...</p>
      </div>
    );
  }

  const handlePlaydateChange = async (id, hadPlaydate, comments) => {
    try {
      await updatePlaydateInfo(id, hadPlaydate, comments);
      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, hadPlaydate, playdateComments: comments } : r
        )
      );
    } catch (err) {
      console.error(err);
      alert("Could not save playdate info.");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "30px auto", padding: "0 16px" }}>
      <h2>Past Hangouts</h2>
      <p style={{ fontSize: 14, color: "#555" }}>
        These are all the requests your family has sent or received.
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
        <p>No requests found yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
            marginTop: 10,
          }}
        >
          <thead>
            <tr>
              <th style={thTd}>Type</th>
              <th style={thTd}>Child</th>
              <th style={thTd}>Date</th>
              <th style={thTd}>Time</th>
              <th style={thTd}>Notes</th>
              <th style={thTd}>Direction</th>
              <th style={thTd}>Had Playdate?</th>
              <th style={thTd}>Playdate Notes</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => {
              const isSender = req.fromUser && req.fromUser.email === user.email;
              const fromEmail = req.fromUser?.email || "";
              const toEmail = req.toUser?.email || "";
              return (
                <tr key={req._id}>
                  <td style={thTd}>{req.purpose || req.type || ""}</td>
                  <td style={thTd}>{req.childName || ""}</td>
                  <td style={thTd}>{req.date || ""}</td>
                  <td style={thTd}>{req.time || ""}</td>
                  <td style={thTd}>{req.notes || ""}</td>
                  <td style={thTd}>
                    {isSender ? "Sent" : "Received"}
                    <br />
                    <strong>From:</strong> {fromEmail}
                    <br />
                    <strong>To:</strong> {toEmail}
                  </td>
                  <td style={thTd}>
                    <input
                      type="checkbox"
                      checked={!!req.hadPlaydate}
                      onChange={(e) =>
                        handlePlaydateChange(
                          req._id,
                          e.target.checked,
                          req.playdateComments || ""
                        )
                      }
                    />
                  </td>
                  <td style={thTd}>
                    <textarea
                      style={{ width: "100%", minHeight: 40 }}
                      value={req.playdateComments || ""}
                      onChange={(e) =>
                        handlePlaydateChange(
                          req._id,
                          !!req.hadPlaydate,
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thTd = {
  border: "1px solid #ddd",
  padding: "6px 8px",
  verticalAlign: "top",
};
