"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export default function CTASection() {
    return (
        <section className="py-40 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-background" />

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <Reveal direction="up" delay={0.1}>
                    <div className="glass-strong rounded-[3rem] border-white/10 p-12 md:p-24 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden group">
                        {/* Internal Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)]" />

                        <div className="relative z-10">
                            <Reveal delay={0.2}>
                                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-10">
                                    <ShieldCheck className="h-4 w-4" />
                                    Institutional Enclave
                                </div>
                            </Reveal>

                            <Reveal delay={0.3} width="100%">
                                <h2 className="font-montserrat text-4xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tighter">
                                    Secure Your Final <br />
                                    <span className="text-gradient-gold">Economic Frontier</span>
                                </h2>
                            </Reveal>

                            <Reveal delay={0.4} width="100%">
                                <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-14 font-medium uppercase tracking-[0.2em] opacity-60 leading-relaxed">
                                    Architecture for the digital sovereign. Join the premier
                                    perimeter for high-trust institutional capital flow.
                                </p>
                            </Reveal>

                            <div className="flex flex-col items-center justify-center gap-8">
                                <Reveal delay={0.5}>
                                    <Link href="/register">
                                        <Button
                                            size="lg"
                                            className="text-[11px] font-black uppercase tracking-[0.3em] px-14 h-18 rounded-2xl shadow-2xl shadow-primary/20 transition-all hover:scale-[1.03] active:scale-[0.97]"
                                        >
                                            Initiate Onboarding <ArrowRight className="ml-3 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </Reveal>
                                <Reveal delay={0.6}>
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
                                        Zero Compromise Infrastructure • Platinum Standard Escrow
                                    </p>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
