import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, login, saveAuth } from "../api/client";

export default function AuthPage() {
  const [mode, setMode] = useState("signup");
  const [signupForm, setSignupForm] = useState({
    familyName: "",
    email: "",
    password: "",
    schoolCode: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignupChange = (e) =>
    setSignupForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLoginChange = (e) =>
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await signup({
        familyName: signupForm.familyName.trim(),
        email: signupForm.email.trim(),
        password: signupForm.password,
        schoolCode: signupForm.schoolCode.trim(),
      });

      if (data.token && data.user) {
        saveAuth(data.token, data.user);
        navigate("/home");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login({
        email: loginForm.email.trim(),
        password: loginForm.password,
      });

      if (data.token && data.user) {
        saveAuth(data.token, data.user);
        navigate("/home");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url("https://export-download.canva.com/NQf1A/DAG50LNQf1A/6/0/0001-7458446769258765633.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20251126%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251126T021850Z&X-Amz-Expires=59731&X-Amz-Signature=3c57be771b03a0825e7e0bbc46ba8073163dd3aa954ed68f480b8eba1b892bec&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27Untitled%2520design.png&response-expires=Wed%2C%2026%20Nov%202025%2018%3A54%3A21%20GMT")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(255,255,255,0.88)",
          padding: "22px 26px",
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          backdropFilter: "blur(4px)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: 10,
            fontFamily: "'Fredoka One', 'Baloo 2', sans-serif",
            fontSize: 48,
            letterSpacing: 2,
            fontWeight: 900,
            color: "#f7b6cd",
            textShadow:
              "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000000ff",
          }}
        >
          HANGOUT
        </h1>

        <h4 style={{ textAlign: "center", marginBottom: 8 }}>
          {mode === "signup" ? "Connect with families at your school, plan playdates, and keep your kid's social calendar and contacts all in one place!" : "Welcome back, Besties! Let's hangout!"}
        </h4>

        {error && (
          <div
            style={{
              background: "#ffe0e0",
              color: "#b30000",
              padding: "8px 10px",
              marginBottom: 12,
              borderRadius: 6,
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {mode === "signup" ? (
          <form onSubmit={handleSignupSubmit}>
            <Label>Family Name</Label>
            <Input name="familyName" value={signupForm.familyName} onChange={handleSignupChange} />

            <Label>Email</Label>
            <Input type="email" name="email" value={signupForm.email} onChange={handleSignupChange} />

            <Label>Password</Label>
            <Input type="password" name="password" value={signupForm.password} onChange={handleSignupChange} />

            <Label>School / Group Code</Label>
            <Input name="schoolCode" value={signupForm.schoolCode} onChange={handleSignupChange} />

            <Button disabled={loading}>{loading ? "Creating..." : "Sign Up"}</Button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit}>
            <Label>Email</Label>
            <Input type="email" name="email" value={loginForm.email} onChange={handleLoginChange} />

            <Label>Password</Label>
            <Input type="password" name="password" value={loginForm.password} onChange={handleLoginChange} />

            <Button disabled={loading}>{loading ? "Logging in..." : "Log In"}</Button>
          </form>
        )}

        <div style={{ marginTop: 16, textAlign: "center" }}>
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <span className="auth-link" onClick={() => setMode("login")}>
                Log in
              </span>
            </>
          ) : (
            <>
              Need an account?{" "}
              <span className="auth-link" onClick={() => setMode("signup")}>
                Sign up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Label({ children }) {
  return <label style={{ display: "block", marginTop: 10, fontWeight: 600 }}>{children}</label>;
}

function Input(props) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "8px",
        marginTop: 4,
        borderRadius: 6,
        border: "1px solid #ccc",
      }}
    />
  );
}

function Button({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        width: "100%",
        padding: 10,
        marginTop: 16,
        borderRadius: 6,
        border: "none",
        background: "#f7b6cd",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
