"use client"

import { useEffect } from "react";
import AuthForm from "./AuthForm";


type Props = {
  open: boolean
  onClose: () => void
  onSuccess?: (user: any) => void;
};

export default function AuthModal({ open, onClose, onSuccess }: Props) {
// lock scroll when the modal is on
   useEffect(() => {
    if (!open) return;
    const next = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = next;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onMouseDown={onClose}>
        <div className="w-full max-w-md rounded-2xl bg-white p-6"
            onMouseDown={(e) => e.stopPropagation()}>


            <div className="flex justify-end">
                <button onClick={onClose}>x</button>
            </div>

            <AuthForm onSuccess={(user) => {
                  onSuccess?.(user);
                  onClose()
            }} />
        </div>
    </div>
  )
}
  