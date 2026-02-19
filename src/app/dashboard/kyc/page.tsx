import { KycForm } from "@/components/kyc/KycForm";
import { Reveal } from "@/components/reveal";
import { ShieldCheck } from "lucide-react";

export default function KycPage() {
    return (
        <div className="container mx-auto py-20 px-4 relative">
            {/* Background Ambience */}
            <div className="absolute inset-x-0 -top-20 h-96 bg-gradient-to-b from-primary/5 to-transparent blur-3xl -z-10" />

            <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6 mb-16">
                <Reveal direction="down" delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                        <ShieldCheck className="h-3 w-3" />
                        Vetting Protocol
                    </div>
                </Reveal>
                <Reveal direction="down" delay={0.2} width="100%">
                    <h1 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter">Identity <span className="text-gradient-gold">Verification</span></h1>
                </Reveal>
                <Reveal direction="down" delay={0.3}>
                    <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.2em] opacity-60 max-w-xl">
                        Compliance is fundamental to our secure enclave. Elevate your clearance to enable frictionless institutional capital flow.
                    </p>
                </Reveal>
            </div>

            <Reveal direction="up" delay={0.4} width="100%">
                <KycForm />
            </Reveal>
        </div>
    );
}
