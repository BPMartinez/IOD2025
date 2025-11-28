import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import RequestFormPage from "./pages/RequestFormPage";
import MyRequestsPage from "./pages/MyRequestsPage";
import IncomingRequestsPage from "./pages/IncomingRequestsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/request" element={<RequestFormPage />} />
      <Route path="/requests" element={<MyRequestsPage />} />
      <Route path="/incoming" element={<IncomingRequestsPage />} />
      {/* default route */}
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
