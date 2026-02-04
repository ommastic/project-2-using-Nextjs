"use client";

import { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/firebase"

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
  const [message, setMessage] = useState<{ text: string; type: "ok" | "error" } | null>(null);

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
    setMessage(null);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email)
      setMessage({
       text: "If the email you entered exists, a reset link has been sent.",
       type: "ok"
    });
    } catch(error: any){
      const code = error?.code || ""
      let text = "Something went wrong. Please try again."
      if (code === "auth/invalid-email"){
        text = "Please enter a valid email address"
      }
      if (code === "auth/too-many-requests"){
        text = "Too many requests. Try again later"
      }
      if (code === "auth/user-not-found"){
        text: "No account found for that email"
      }
      setMessage({ text, type: "error"})
    } finally {
      setLoading(false);
    }
  }
    let messageClass = "reset-message"
    if (message ?.type === "error"){
        messageClass += " error"
    }

  return (
    <div className="reset-overlay" onMouseDown={onClose}>
      <div className="reset-modal" onMouseDown={(e) => e.stopPropagation()} aria-modal="true">
        <button onClick={onClose} className="reset-close" aria-label="Close">
          x
        </button>

        <div className="reset-title">Reset your password</div>
        <form className="reset-form" onSubmit={sendReset}>
            <input type="email" className="reset-input" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required/>
            <button className="reset-button" disabled={loading}>
                {loading ? "Sending..." : "Send reset password link"}
            </button>
         
            {message && (
                <div className={messageClass}>{message.text}</div>
            )}
        </form>
      </div>
    </div>
  );
}
