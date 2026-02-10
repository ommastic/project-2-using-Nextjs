"use client";

import { useState } from "react";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import ForgotPasswordModal from "./ForgotPasswordModal";

type Mode = "login" | "signup";

type AuthFormProps = {
  defaultMode?: Mode;
  onSuccess?: (user: any) => void;
  onForgotPassword?: () => void;
  showAltAuth?: boolean;
  showSwitch?: boolean;
};

export default function AuthForm({
  defaultMode = "login",
  onSuccess,
  onForgotPassword,
  showAltAuth = true,
  showSwitch = true,
}: AuthFormProps) {
  const [mode, setMode] = useState<Mode>(defaultMode);
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
    <div className="auth__modal--inner">
      <h2 className="auth-title">
        {mode === "login" ? "Log in to Summarist" : "Create your account"}
      </h2>

      {showAltAuth && mode === "login" && (
        <>
          <div className="auth-actions">
            <button
              type="button"
              className="auth-btn auth-btn-guest"
              onClick={loginGuest}
              disabled={guestLoading || loading}
            >
              <span className="user-icon">
                <FaRegUser width={24} height={24} />
              </span>
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
              <span className="google-button__icon">
                <Image
                  src="/google.png"
                  alt="Google-logo"
                  width={24}
                  height={24}
                />
              </span>
              {mode === "login" ? "Login with Google" : "Sign up with Google"}
            </button>
          </div>
          <div className="auth-divider auth-divider--spaced">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or</span>
            <div className="auth-divider-line" />
          </div>
        </>
      )}

      <form onSubmit={onSubmit} className="auth-form--fields">
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

        <button
          type="submit"
          className="auth-btn auth-submit"
          disabled={loading}
        >
          {loading ? "loading..." : mode === "login" ? "Log in" : "Sign up"}
        </button>
      </form>
      </div>

      <div className="auth-switch">
        {mode === "login" ? (
          <div className="auth-switch--wrapper">
            <button onClick={onForgotPassword} className="auth-link">
              Forgot your password?
            </button>
            <div className="auth__bottom--strip">
              <button
                onClick={() => {
                  setErr("");
                  setMode("signup");
                }}
                className="auth-link auth-link--strong"
              >
                Don't have an account?
              </button>
            </div>
          </div>
        ) : (
          showSwitch && (
            <div className="auth-bottom--strip">
              <button
                onClick={() => {
                  setErr("");
                  setMode("login");
                }}
              >
                Already have an account?
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
}
function signIn(arg0: string) {
  throw new Error("Function not implemented.");
}
