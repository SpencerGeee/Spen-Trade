import { KycForm } from "@/components/kyc/KycForm";

export default function KycPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="mb-12 text-center space-y-4">
                <h1 className="text-4xl font-bold font-serif text-primary">Verify Your Identity</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Compliance is key to a secure trading environment. Please complete the verification process below to unlock full feature access.
                </p>
            </div>

            <KycForm />
        </div>
    );
}
