import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";

function getRequests() {
  return JSON.parse(localStorage.getItem("playdateRequests") || "[]");
}
function saveRequests(reqs) {
  localStorage.setItem("playdateRequests", JSON.stringify(reqs));
}

export default function RequestsToMe() {
  const { currentUser } = useUser();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const all = getRequests().map((r) => ({
      status: r.status || "pending",
      ...r,
    }));
    const mine = all.filter((r) => r.toUserEmail === currentUser.email);
    setRequests(mine);
  }, [currentUser]);

  function updateStatus(index, status) {
    const all = getRequests().map((r) => ({
      status: r.status || "pending",
      ...r,
    }));
    const target = requests[index];
    const realIndex = all.findIndex(
      (r) =>
        r.fromUserEmail === target.fromUserEmail &&
        r.toUserEmail === target.toUserEmail &&
        r.createdAt === target.createdAt
    );
    if (realIndex === -1) return;
    all[realIndex].status = status;
    saveRequests(all);

    const updated = [...requests];
    updated[index] = { ...updated[index], status };
    setRequests(updated);
  }

  if (!currentUser) return null;

  return (
    <div className="page-container">
      <h2>Requests Sent To Me</h2>
      {requests.length === 0 ? (
        <p>You don’t have any requests yet.</p>
      ) : (
        <div className="cards">
          {requests.map((r, i) => (
            <div className="request-card" key={i}>
              <div className="request-card-photo">
                {r.photoData ? (
                  <img src={r.photoData} alt="family" className="thumb-large" />
                ) : (
                  <span className="no-photo">No photo</span>
                )}
              </div>
              <div className="request-card-body">
                <h3>
                  {r.parentName} – {r.purpose}
                </h3>
                <p className="small-text">
                  From: {r.fromUserEmail}
                  <br />
                  Child: {r.childName}
                  <br />
                  Phone: {r.phone}
                  <br />
                  Email: {r.email}
                  <br />
                  Date / Time: {r.date || "TBA"}
                  {r.time && ` @ ${r.time}`}
                </p>
                {r.notes && <p>Notes: {r.notes}</p>}
                <div className="status-row">
                  <span className={`status-badge status-${r.status}`}>
                    {r.status}
                  </span>
                  <div className="status-buttons">
                    <button
                      className="btn-accept"
                      onClick={() => updateStatus(i, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn-decline"
                      onClick={() => updateStatus(i, "declined")}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
