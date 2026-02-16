import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
    title: "Login | SpenTrade",
    description: "Sign in to your SpenTrade account to start trading.",
};

export default function LoginPage() {
    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Enter your email to sign in to your account"
        >
            <LoginForm />
        </AuthLayout>
    );
}
