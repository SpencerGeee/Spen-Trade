import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
    title: "Register | SpenTrade",
    description: "Create a new SpenTrade account to join the marketplace.",
};

export default function RegisterPage() {
    return (
        <AuthLayout
            title="Create an account"
            subtitle="Enter your email below to create your account"
        >
            <RegisterForm />
        </AuthLayout>
    );
}
