"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

type AuthFormProps = {
  onSuccess?: (user: any) => void;
  onForgotPassword?: () => void
};

export default function AuthForm({ onSuccess }: AuthFormProps) {

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [guestLoading, setGuestLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const endpoint =
        mode === "login" ? "/api/auth/login" : "/api/auth/signup";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Authentication failed");
      }

      onSuccess?.(data?.user ?? data);
    } catch (event: any) {
      setErr(event?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function loginGuest() {
    setErr("");
    setGuestLoading(true);

    try {
      const response = await fetch("/api/auth/guest", { method: "POST" });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || "Guest login failed");
      }

      onSuccess?.(data?.user ?? data);
    } catch (event: any) {
      setErr(event?.message || "something went wrong");
    } finally {
      setGuestLoading(false);
    }
  }

  function loginGoogle() {
    setErr("");
    setGuestLoading(true);
    signIn("google"); //redirect to google
  }
  return (
    <>
      <div className="auth-form">
        <h2 className="auth-title">
          {mode === "login" ? "Log in to Summarist" : "Create your account"}
        </h2>

        <div className="auth-actions">
          <button
            type="button"
            className="auth-btn auth-btn-guest"
            onClick={loginGuest}
            disabled={guestLoading || loading}
          >
            Login as a Guest
          </button>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or</span>
            <div className="auth-divider-line" />
          </div>

          <button
            type="button"
            className="auth-btn auth-btn-google"
            onClick={loginGoogle}
            disabled={guestLoading || loading}
          >
            <span className="auth-divider-text">G</span>
            Login with Google
          </button>
        </div>
        <div className="auth-divider">
          <div className="auth-divider-line" />
          <span className="auth-divider-text">or</span>
          <div className="auth-divider-line" />
        </div>

        <form onSubmit={onSubmit}>
          <input
            className="auth-input"
            type="email"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {err && <p className="auth-error">{err}</p>}

          <button className="auth-submit" disabled={loading}>
            {loading ? "loading..." : mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>

        <div className="auth-switch">
          {mode === "login" ? (
            <div className="auth-switch-wrapper">
              <button
                onClick={() => {
                  "forgot password logic";
                }}
                className="auth-switch-title"
              >
                {" "}
                Forgot your password?
              </button>
              <button
                onClick={() => setMode("signup")}
                className="auth-switch-title"
              >
                Don't have an account?
              </button>
            </div>
          ) : (
            <button onClick={() => setMode("login")}>
              Already have an account?
            </button>
          )}
        </div>
      </div>
    </>
  );
}
