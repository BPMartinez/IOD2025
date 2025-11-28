// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  getCurrentUser,
  clearAuth,
  fetchEvents,
  createEvent,
  toggleEventGoing,
  addEventComment,
  updateEventComment,
  deleteEventComment,
} from "../api/client";
import SchoolNetwork from "../components/SchoolNetwork";

export default function HomePage() {
  const user = getCurrentUser();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const [commentText, setCommentText] = useState({});


  const [editingComment, setEditingComment] = useState({
    eventId: null,
    commentId: null,
    text: "",
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadEvents = async () => {
      try {
        const apiEvents = await fetchEvents();
        const normalized = (apiEvents || []).map((e) => ({
          ...e,
          goingEmails: Array.isArray(e.goingEmails) ? e.goingEmails : [],
          comments: Array.isArray(e.comments) ? e.comments : [],
        }));
        setEvents(normalized);
      } catch (err) {
        console.error(err);
        setError(err.message || "Could not load events.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [user]);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div style={{ maxWidth: 900, margin: "30px auto", padding: "0 16px" }}>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const handleLogout = () => {
    clearAuth();
    window.location.href = "/auth";
  };

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setError("");

    if (!newEvent.title.trim()) {
      setError("Please add a title for your event.");
      return;
    }

    try {
      const payload = {
        title: newEvent.title.trim(),
        date: newEvent.date || "",
        time: newEvent.time || "",
        location: newEvent.location || "",
        description: newEvent.description || "",
      };

      const created = await createEvent(payload);

      const normalized = {
        ...created,
        goingEmails: Array.isArray(created.goingEmails)
          ? created.goingEmails
          : [],
        comments: Array.isArray(created.comments) ? created.comments : [],
      };

      setEvents((prev) => [normalized, ...prev]);

      setNewEvent({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not create event.");
    }
  };

  const handleToggleGoing = async (eventId) => {
    try {
      const updated = await toggleEventGoing(eventId);

      const normalized = {
        ...updated,
        goingEmails: Array.isArray(updated.goingEmails)
          ? updated.goingEmails
          : [],
        comments: Array.isArray(updated.comments) ? updated.comments : [],
      };

      setEvents((prev) =>
        prev.map((ev) => (ev._id === eventId ? normalized : ev))
      );
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not update RSVP.");
    }
  };

  const handleAddComment = async (eventId) => {
    const text = (commentText[eventId] || "").trim();
    if (!text) return;

    try {
      const updated = await addEventComment(eventId, text);

      const normalized = {
        ...updated,
        goingEmails: Array.isArray(updated.goingEmails)
          ? updated.goingEmails
          : [],
        comments: Array.isArray(updated.comments) ? updated.comments : [],
      };

      setEvents((prev) =>
        prev.map((ev) => (ev._id === eventId ? normalized : ev))
      );

      setCommentText((prev) => ({ ...prev, [eventId]: "" }));
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not add comment.");
    }
  };

  const startEditComment = (eventId, comment) => {
    setEditingComment({
      eventId,
      commentId: comment._id,
      text: comment.text,
    });
  };

  const cancelEditComment = () => {
    setEditingComment({
      eventId: null,
      commentId: null,
      text: "",
    });
  };

  const saveEditedComment = async () => {
    const { eventId, commentId, text } = editingComment;
    const trimmed = text.trim();
    if (!eventId || !commentId || !trimmed) return;

    try {
      const updated = await updateEventComment(eventId, commentId, trimmed);

      const normalized = {
        ...updated,
        goingEmails: Array.isArray(updated.goingEmails)
          ? updated.goingEmails
          : [],
        comments: Array.isArray(updated.comments) ? updated.comments : [],
      };

      setEvents((prev) =>
        prev.map((ev) => (ev._id === eventId ? normalized : ev))
      );

      cancelEditComment();
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not update comment.");
    }
  };

  const handleDeleteComment = async (eventId, commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      const updated = await deleteEventComment(eventId, commentId);

      const normalized = {
        ...updated,
        goingEmails: Array.isArray(updated.goingEmails)
          ? updated.goingEmails
          : [],
        comments: Array.isArray(updated.comments) ? updated.comments : [],
      };

      setEvents((prev) =>
        prev.map((ev) => (ev._id === eventId ? normalized : ev))
      );

      if (
        editingComment.eventId === eventId &&
        editingComment.commentId === commentId
      ) {
        cancelEditComment();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not delete comment.");
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "20px auto", padding: "0 16px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h2 style={{ marginBottom: 4 }}>Welcome, {user.familyName} </h2>
          <div style={{ fontSize: 13, color: "#555" }}>
            <div>{user.email}</div>
            <div>School / Group Code: {user.schoolCode}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link to="/request" style={linkBtn}>
            New Request
          </Link>
          <Link to="/requests" style={linkBtn}>
            Past Hangouts
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 20,
          alignItems: "flex-start",
        }}
      >
        <SchoolNetwork />

        <section>
          {/* New event form */}
          <div
            style={{
              background: "#fff",
              padding: 16,
              borderRadius: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              marginBottom: 18,
            }}
          >
            <h3>Community Board – Post an Event</h3>
            <p style={{ fontSize: 13, color: "#666" }}>
              Share open events with your school community (park playdates,
              after-school meetups, etc.).
            </p>

            <form onSubmit={handleCreateEvent}>
              <Label>Event Title</Label>
              <Input
                name="title"
                value={newEvent.title}
                onChange={handleNewEventChange}
                placeholder="e.g. Friday Park Playdate"
                required
              />

              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleNewEventChange}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Label>Time</Label>
                  <Input
                    type="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleNewEventChange}
                  />
                </div>
              </div>

              <Label>Location</Label>
              <Input
                name="location"
                value={newEvent.location}
                onChange={handleNewEventChange}
                placeholder="e.g. School playground, local park, etc."
              />

              <Label>Description</Label>
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleNewEventChange}
                style={{
                  width: "100%",
                  padding: 8,
                  marginTop: 4,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 14,
                  boxSizing: "border-box",
                  minHeight: 60,
                }}
                placeholder="What should other families know?"
              />

              <button type="submit" style={primaryBtn}>
                Post Event
              </button>
            </form>
          </div>

          {/* Events list */}
          <div
            style={{
              background: "#fff",
              padding: 16,
              borderRadius: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <h3>Open Community Events</h3>

            {events.length === 0 ? (
              <p style={{ fontSize: 13 }}>No events posted yet.</p>
            ) : (
              events.map((ev) => {
                const iAmGoing = ev.goingEmails.includes(user.email);
                const goingCount = ev.goingEmails.length;

                return (
                  <div
                    key={ev._id}
                    style={{
                      borderBottom: "1px solid #eee",
                      paddingBottom: 12,
                      marginBottom: 12,
                      fontSize: 13,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 16,
                      }}
                    >
                      <div>
                        <h4 style={{ margin: "0 0 4px" }}>{ev.title}</h4>
                        <div style={{ color: "#666" }}>
                          {ev.date && <span>{ev.date}</span>}
                          {ev.time && <span> · {ev.time}</span>}
                          {ev.location && <span> · {ev.location}</span>}
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <button
                          type="button"
                          onClick={() => handleToggleGoing(ev._id)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: 6,
                            border: "1px solid #fb9dd0ff",
                            background: iAmGoing ? "#fb9dd0ff" : "#fff",
                            color: iAmGoing ? "#fff" : "#fb9dd0ff",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          {iAmGoing ? "I’m going" : "I want to go"}
                        </button>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#666",
                            marginTop: 4,
                          }}
                        >
                          {goingCount === 0
                            ? "No RSVPs yet"
                            : goingCount === 1
                            ? "1 family going"
                            : `${goingCount} families going`}
                        </div>
                        {goingCount > 0 && (
                          <div
                            style={{
                              fontSize: 11,
                              color: "#333",
                              marginTop: 2,
                            }}
                          >
                            Going: {ev.goingEmails.join(", ")}
                          </div>
                        )}
                      </div>
                    </div>

                    {ev.description && (
                      <p style={{ marginTop: 6 }}>{ev.description}</p>
                    )}

                    {/* Comments */}
                    <div style={{ marginTop: 8 }}>
                      {ev.comments.length > 0 && (
                        <div style={{ marginBottom: 6 }}>
                          {ev.comments.map((c) => {
                            const isMine =
                              c.authorEmail === user.email ||
                              (!c.authorEmail &&
                                c.author ===
                                  (user.familyName || user.email));

                            const isEditing =
                              editingComment.eventId === ev._id &&
                              editingComment.commentId === c._id;

                            return (
                              <div
                                key={c._id || c.createdAt}
                                style={{
                                  background: "#f7f7f7",
                                  padding: "4px 6px",
                                  borderRadius: 6,
                                  marginBottom: 4,
                                }}
                              >
                                {isEditing ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: 4,
                                    }}
                                  >
                                    <textarea
                                      value={editingComment.text}
                                      onChange={(e) =>
                                        setEditingComment((prev) => ({
                                          ...prev,
                                          text: e.target.value,
                                        }))
                                      }
                                      style={{
                                        width: "100%",
                                        minHeight: 40,
                                        fontSize: 12,
                                        padding: 4,
                                        borderRadius: 4,
                                        border: "1px solid #ccc",
                                      }}
                                    />
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: 6,
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <button
                                        type="button"
                                        onClick={saveEditedComment}
                                        style={{
                                          border: "none",
                                          borderRadius: 4,
                                          padding: "2px 8px",
                                          fontSize: 11,
                                          background: "#4CAF50",
                                          color: "#fff",
                                          cursor: "pointer",
                                        }}
                                      >
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        onClick={cancelEditComment}
                                        style={{
                                          border: "none",
                                          borderRadius: 4,
                                          padding: "2px 8px",
                                          fontSize: 11,
                                          background: "#ddd",
                                          cursor: "pointer",
                                        }}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      gap: 8,
                                    }}
                                  >
                                    <div>
                                      <strong>{c.author}:</strong> {c.text}
                                    </div>
                                    {isMine && (
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: 4,
                                          fontSize: 11,
                                        }}
                                      >
                                        <button
                                          type="button"
                                          onClick={() =>
                                            startEditComment(ev._id, c)
                                          }
                                          style={{
                                            border: "none",
                                            background: "transparent",
                                            color: "#007bff",
                                            cursor: "pointer",
                                            padding: 0,
                                          }}
                                        >
                                          Edit
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleDeleteComment(ev._id, c._id)
                                          }
                                          style={{
                                            border: "none",
                                            background: "transparent",
                                            color: "#c00",
                                            cursor: "pointer",
                                            padding: 0,
                                          }}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                        <input
                          type="text"
                          placeholder="Add a comment"
                          value={commentText[ev._id] || ""}
                          onChange={(e) =>
                            setCommentText((prev) => ({
                              ...prev,
                              [ev._id]: e.target.value,
                            }))
                          }
                          style={{
                            flex: 1,
                            padding: 6,
                            borderRadius: 6,
                            border: "1px solid #ccc",
                            fontSize: 13,
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddComment(ev._id)}
                          style={{
                            padding: "6px 10px",
                            borderRadius: 6,
                            border: "none",
                            background: "#eee",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <label
      style={{ display: "block", marginTop: 10, fontWeight: "bold", fontSize: 14 }}
    >
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: 8,
        marginTop: 4,
        borderRadius: 6,
        border: "1px solid #ccc",
        fontSize: 14,
        boxSizing: "border-box",
        ...(props.style || {}),
      }}
    />
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

const primaryBtn = {
  marginTop: 12,
  padding: 10,
  borderRadius: 6,
  border: "none",
  background: "#fb9dd0ff",
  color: "white",
  fontSize: 14,
  cursor: "pointer",
  width: "100%",
};
