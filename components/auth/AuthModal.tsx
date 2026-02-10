"use client";

import { useEffect } from "react";
import AuthForm from "./AuthForm";
import { RiCloseLargeLine } from "react-icons/ri"

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
    <div className="auth__wrapper" onMouseDown={onClose}>
      <div className="auth__modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="remove__modal" onClick={onClose}>
          <RiCloseLargeLine />
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
