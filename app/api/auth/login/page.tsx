import AuthForm from "@/components/AuthForm";

export default function LoginPage(){
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow ">
                <AuthForm onSuccess={() => { } } />
            </div>
        </div>
    )
}