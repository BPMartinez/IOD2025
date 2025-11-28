

const API_BASE_URL = "http://localhost:5005/api";


export function getToken() {
  return localStorage.getItem("authToken");
}

export function getCurrentUser() {
  const raw = localStorage.getItem("currentUser");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveAuth(token, user) {
  if (!token || !user) return;
  localStorage.setItem("authToken", token);
  localStorage.setItem("currentUser", JSON.stringify(user));
  localStorage.setItem("currentUserEmail", user.email || "");
}

export function clearAuth() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentUserEmail");
}

/* =========================================
   Core request() with auto-token
========================================= */

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message = data?.message || `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return data;
}



export function signup({ familyName, email, password, schoolCode }) {
  return request("/auth/signup", {
    method: "POST",
    body: { familyName, email, password, schoolCode },
  });
}

export function login({ email, password }) {
  return request("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}



export function fetchEvents() {
  return request("/events");
}

export function createEvent(payload) {
  return request("/events", {
    method: "POST",
    body: payload,
  });
}

// POST /api/events/:id/going  (RSVP toggle)
export function toggleEventGoing(eventId) {
  return request(`/events/${eventId}/going`, {
    method: "POST",
  });
}


export function addEventComment(eventId, text) {
  return request(`/events/${eventId}/comments`, {
    method: "POST",
    body: { text },
  });
}

export function updateEventComment(eventId, commentId, text) {
  return request(`/events/${eventId}/comments/${commentId}`, {
    method: "PUT",
    body: { text },
  });
}

// 🆕 delete a comment
export function deleteEventComment(eventId, commentId) {
  return request(`/events/${eventId}/comments/${commentId}`, {
    method: "DELETE",
  });
}



export function createRequest(payload) {
  return request("/requests", {
    method: "POST",
    body: payload,
  });
}

export function fetchMyRequests() {
  return request("/requests");
}

export function fetchInboundRequests() {
  return request("/requests/inbound");
}

export function updateRequestStatus(id, status) {
  return request(`/requests/${id}/status`, {
    method: "PUT",
    body: { status },
  });
}

export function updatePlaydateInfo(id, hadPlaydate, playdateComments) {
  return request(`/requests/${id}/playdate`, {
    method: "PUT",
    body: { hadPlaydate, playdateComments },
  });
}



export function fetchSchoolNetwork() {
  return request("/families/network");
}

export function createChildProfile(payload) {
  return request("/families/children", {
    method: "POST",
    body: payload,
  });
}

export function updateChildProfile(childId, payload) {
  return request(`/families/children/${childId}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteChildProfile(childId) {
  return request(`/families/children/${childId}`, {
    method: "DELETE",
  });
}
