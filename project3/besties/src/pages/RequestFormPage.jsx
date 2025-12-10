
import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { getCurrentUser, createRequest } from "../api/client";

export default function RequestFormPage() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    toEmail: "",
    childName: "",
    parentName: "",
    phone: "",
    email: "",
    purpose: "Playdate",
    date: "",
    time: "",
    notes: "",
  });

  if (!user) return <Navigate to="/auth" replace />;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await createRequest({ ...form });

      alert("Request sent! You can see it in 'Hangouts'.");

      setForm({
        toEmail: "",
        childName: "",
        parentName: "",
        phone: "",
        email: "",
        purpose: "Playdate",
        date: "",
        time: "",
        notes: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not send request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "30px auto", padding: "0 16px" }}>
      
      {/* ⭐ TOP BUTTON GROUP — SAME AS MyRequestsPage */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "flex-end",
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <Link to="/home" style={linkBtn}>Home</Link>
        <Link to="/requests" style={linkBtn}>Hangouts</Link>
        <Link to="/incoming" style={linkBtn}>Requests To Me</Link>
        <button onClick={handleLogout} style={logoutBtn}>Log Out</button>
      </div>

      <h2>Create a Playdate / Carpool Request</h2>
      <p style={{ fontSize: 14, color: "#555" }}>
        This form sends a real request through your Node / Express / MongoDB backend.
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

      <form onSubmit={handleSubmit}>
        <Label>Send To (Family Email)</Label>
        <Input
          name="toEmail"
          type="email"
          value={form.toEmail}
          onChange={handleChange}
          placeholder="email of the other parent"
          required
        />

        <Label>Your Child’s Name</Label>
        <Input name="childName" value={form.childName} onChange={handleChange} required />

        <Label>Your Name</Label>
        <Input
          name="parentName"
          value={form.parentName}
          onChange={handleChange}
          placeholder="Parent / guardian name"
        />

        <Label>Your Phone</Label>
        <Input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="For quick coordination"
        />

        <Label>Your Email (reply-to)</Label>
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Contact email"
        />

        <Label>Purpose</Label>
        <select
          name="purpose"
          value={form.purpose}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Playdate">Playdate</option>
          <option value="Carpool">Carpool</option>
          <option value="Other">Other</option>
        </select>

        <Label>Date</Label>
        <Input type="date" name="date" value={form.date} onChange={handleChange} />

        <Label>Time</Label>
        <Input type="time" name="time" value={form.time} onChange={handleChange} />

        <Label>Notes</Label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          style={{ ...inputStyle, height: 80 }}
          placeholder="Any special instructions or details"
        />

        <button type="submit" style={buttonStyle} disabled={submitting}>
          {submitting ? "Sending..." : "Send Request"}
        </button>
      </form>
    </div>
  );
}

/* --------------------------- Components --------------------------- */

function Label({ children }) {
  return (
    <label
      style={{
        display: "block",
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 14,
      }}
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
        ...inputStyle,
        ...(props.style || {}),
      }}
    />
  );
}

/* --------------------------- Styles --------------------------- */

const inputStyle = {
  width: "100%",
  padding: 8,
  marginTop: 4,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 14,
  boxSizing: "border-box",
};

const buttonStyle = {
  marginTop: 16,
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: "none",
  background: "#fb9dd0ff",
  color: "white",
  fontSize: 15,
  cursor: "pointer",
};

/* ⭐ Same button styles used across multiple pages */
const linkBtn = {
  padding: "6px 10px",
  borderRadius: 6,
  background: "#f7b6cd",
  color: "#fff",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 600,
  border: "none",
  display: "inline-block",
  cursor: "pointer",
};

const logoutBtn = {
  ...linkBtn,
  background: "#fff",
  color: "#f7b6cd",
  border: "1px solid #f7b6cd",
};
