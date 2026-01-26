"use client";

import { useEffect, useState } from "react";

type AuthFormProps = {
  onSuccess?: (user: any) => void;
};

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

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
  return (
    <>
      <div className="w-full max-w-lg">
        <h2 className="text-xl font-semibold">
          {mode === "login" ? "Log in" : "Create account"}
        </h2>

        <form onSubmit={onSubmit} className="mt-4 space-y-3 pb-3">
          <input
            className="w-full rounded-lg border m-2 p-3"
            type="email"
            value={email}
            placeholder="johndoe@something.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full rounded-lg border p-3"
            type="password"
            value={password}
            placeholder="***********"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {err && <p className="text-sm text-red-600">{err}</p>}

          <button
            className="w-full rounded-lg bg-black p-3 text-white disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "loading..." : mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>
        <div className="mt-4 text-sm">
          {mode === "login" ? (
            <button
              type="button"
              className="underline"
              onClick={() => setMode("signup")}
            >
              Dont'have an account? Sign up
            </button>
          ) : (
            <button type="button" onClick={() => setMode("login")}>
              Already have an account? Log in
            </button>
          )}
        </div>
      </div>
    </>
  );
}
