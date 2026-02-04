"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="login-page">
      <div className="login-card">
        <AuthForm
          defaultMode="login"
          onSuccess={() => router.push("/")}
          showAltAuth
          showSwitch
        />
      </div>
    </main>
  );
}
