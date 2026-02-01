"use-client"


import { useState } from "react";
import { useRouter } from "next/router";
import ForgotPasswordModal from "@/components/auth/ForgotPasswordModal";
import AuthForm from "@/components/auth/AuthForm";



export default function LoginPage(){
    const router = useRouter()
    const [showReset, setShowReset] = useState(false)

    return (
        <>
        <main className="login-page">
            <div className="login-card">
                <AuthForm onSuccess={(user) => { 
                    console.log("Logged in:", user)
                    router.push("/")
                } } 
                onForgotPassword={() => setShowReset(true)}/>
            </div>
        </main>

        <ForgotPasswordModal open={showReset} onClose={() => setShowReset(false)} onGoToLogIn={() => setShowReset(false)} />
        </>
    )
}