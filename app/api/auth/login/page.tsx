import AuthForm from "@/components/AuthForm";

export default function LoginPage(){
    return (
        <div className="flex items-center justify-center p-4 min-h-screen">
            <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-lg ">
                <AuthForm onSuccess={() => { } } />
            </div>
        </div>
    )
}