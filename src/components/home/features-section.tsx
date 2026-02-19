"use client";

import { Shield, Zap, Globe, Lock, CreditCard, Fingerprint } from "lucide-react";
import { Reveal } from "@/components/reveal";

const features = [
    {
        icon: Shield,
        title: "Bank-Grade Escrow",
        description: "Every trade is secured via institutional-grade smart contract architecture. Funds are only divested once both counterparties authorize. Zero protocol risk.",
        gradient: "from-amber-500/20 to-yellow-600/5",
        iconColor: "text-amber-500",
        span: "md:col-span-2 md:row-span-1",
    },
    {
        icon: Zap,
        title: "High-Frequency Settlement",
        description: "Execution cycles optimized for speed with automated payment validation and rapid blockchain finality.",
        gradient: "from-cyan-500/20 to-blue-600/5",
        iconColor: "text-cyan-500",
        span: "md:col-span-1 md:row-span-1",
    },
    {
        icon: Globe,
        title: "Global Liquidity",
        description: "A borderless marketplace supporting over 150 jurisdictions and institutional payment gateways.",
        gradient: "from-green-500/20 to-emerald-600/5",
        iconColor: "text-green-500",
        span: "md:col-span-1 md:row-span-1",
    },
    {
        icon: Lock,
        title: "Privacy Sovereignty",
        description: "We prioritize your autonomy. Minimalist data collection and direct peer-to-peer exchange layers.",
        gradient: "from-violet-500/20 to-purple-600/5",
        iconColor: "text-violet-500",
        span: "md:col-span-1 md:row-span-1",
    },
    {
        icon: CreditCard,
        title: "Multi-Rail Support",
        description: "Bank transfers, credit facilities, and digital gateways — trade via your preferred institutional rail.",
        gradient: "from-rose-500/20 to-pink-600/5",
        iconColor: "text-rose-500",
        span: "md:col-span-1 md:row-span-1",
    },
    {
        icon: Fingerprint,
        title: "Identity Verification",
        description: "Rigorous vetting protocols ensure you interact with legitimate, high-trust counterparties.",
        gradient: "from-blue-500/20 to-indigo-600/5",
        iconColor: "text-blue-500",
        span: "md:col-span-1 md:row-span-1",
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-28 bg-background relative overflow-hidden gpu">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/2 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
                    <Reveal delay={0.1}>
                        <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                            SpenTrade Protocol
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <h2 className="font-montserrat text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter text-foreground">
                            Architected for <span className="text-gradient-gold">Absolute Trust</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.3} width="100%">
                        <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.2em] opacity-60">
                            Institutional-grade infrastructure engineered for the digital sovereign.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Reveal
                            key={index}
                            delay={0.1 + (index * 0.05)}
                            direction="up"
                            width="100%"
                            className={feature.span}
                        >
                            <div
                                className="group relative p-10 h-full rounded-[2.5rem] glass glow-border transition-all duration-500 hover:scale-[1.01] overflow-hidden"
                            >
                                {/* Gradient bg on hover */}
                                <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                <div className="relative z-10 space-y-6">
                                    <div className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white/5 border border-white/10 ${feature.iconColor} group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500`}>
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-montserrat font-black tracking-tight mb-3 text-foreground/90">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground text-[13px] leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute -bottom-1 -right-1 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700">
                                    <feature.icon className="h-24 w-24" />
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
