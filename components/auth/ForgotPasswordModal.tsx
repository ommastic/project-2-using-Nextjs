"use client";

import { useState, useEffect } from "react";
import sendPasswordResetEmail

type Props = {
  open: boolean;
  onClose: () => void;
  onGoToLogIn: () => void;
};

export default function ForgotPasswordModal({
  open,
  onClose,
  onGoToLogIn,
}: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // lock scroll when the modal is on
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  async function sendReset(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await fetch("api/auth/forgot-password", { method: "POST" });
      await new Promise((r) => setTimeout(r, 600));
      setMessage(
        "If the email you entered exists, a reset link has been sent.",
      );
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="reset-overlay" onMouseDown={onClose}>
      <div className="reset-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="reset-close" aria-label="Close">
          x
        </button>

        <AuthForm
          onSuccess={(user) => {
            onSuccess?.(user);
            onClose();
          }}
        />
      </div>
    </div>
  );
}


import { useRouter } from "next/navigation";
import AuthForm from "./AuthForm";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="login-page">
      <div className="login-card">
        <AuthForm
          onSuccess={() => router.push("/")}
          onForgotPassword={() => router.push("auth/reset")}
        />
      </div>
    </main>
  );
}
