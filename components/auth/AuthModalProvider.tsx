"use client"
import { createContext, useContext, useState } from "react"
import AuthModal from "./AuthModal"

type AuthCtx = {
    openLogin: () => void;
    closeLogin: () => void;
    user: any
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthModaProvider({children}: {children: React.ReactNode}){
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState<any>(null)

    const openLogin =  () => setOpen(true)
    const closeLogin =  () => setOpen(false)

    return (
        <AuthContext.Provider value={{openLogin, closeLogin, user}}>
            {children}

            <AuthModal open={open} onClose={closeLogin} onSuccess={data => setUser(data)}/>
        </AuthContext.Provider>
    )
}

export function useAuthModal(){
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuthModal must be used inside AuthModal Provider")
        return ctx;
}