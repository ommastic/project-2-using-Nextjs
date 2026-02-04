"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage(){
    const router = useRouter()
   

    return (
        <>
        <main className="signup-page">
            <div className="signup-card">
                <AuthForm defaultMode="signup" showAltAuth={false} showSwitch={false}/> 
            </div>
        </main>
        </>
    )
}