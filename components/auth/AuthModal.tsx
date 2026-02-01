"use client";

import { useEffect } from "react";
import AuthForm from "./AuthForm";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: (user: any) => void;
};

export default function AuthModal({ open, onClose, onSuccess }: Props) {
  // lock scroll when the modal is on
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="auth-overlay" onMouseDown={onClose}>
      <div className="auth-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="remove-modal">x</button>

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
