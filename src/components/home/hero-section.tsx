"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function HeroSection() {
    return (
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-background gpu">
            {/* Floating Gradient Orbs Container */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="orb orb-gold w-[500px] h-[500px] top-[10%] left-[15%]" />
                <div className="orb orb-cyan w-[400px] h-[400px] top-[20%] right-[10%]" />
            </div>

            {/* Retro Grid Floor */}
            <div className="retro-grid" />

            {/* Radial Vignette Overlay */}
            <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background))_80%)]" />

            {/* Content */}
            <div className="relative z-10 w-full flex flex-col items-center text-center px-4">
                {/* Badge */}
                <Reveal delay={0.1}>
                    <div
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 glass px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8"
                    >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Institutional P2P Standard</span>
                        <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    </div>
                </Reveal>

                {/* Main Headline */}
                <Reveal delay={0.2} width="100%">
                    <h1
                        className="font-montserrat text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter text-foreground mb-8 max-w-5xl mx-auto leading-[1.05]"
                    >
                        Trade Digital Assets with <span className="text-gradient-gold">Absolute Finality</span>
                    </h1>
                </Reveal>

                {/* Subhead */}
                <Reveal delay={0.3} width="100%">
                    <p
                        className="text-sm md:text-base text-muted-foreground mb-12 max-w-2xl leading-relaxed mx-auto font-medium uppercase tracking-[0.2em] opacity-60"
                    >
                        Experience the premier perimeter for high-trust peer-to-peer exchange.
                        Multi-layered escrow, lightning settlements, and institutional custody protocols.
                    </p>
                </Reveal>

                {/* CTA Buttons */}
                <Reveal delay={0.4}>
                    <div
                        className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
                    >
                        <Link href="/register">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto text-[11px] font-black uppercase tracking-[0.3em] px-12 h-16 rounded-2xl shadow-xl shadow-primary/10 transition-all hover:scale-[1.02] active:scale-[0.98] gpu"
                            >
                                Initiate Onboarding <ArrowRight className="ml-3 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/offers">
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:w-auto text-[11px] font-black uppercase tracking-[0.3em] px-12 h-16 rounded-2xl border-white/10 hover:bg-white/5 glass transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <Shield className="mr-3 h-4 w-4" /> View Marketplace
                            </Button>
                        </Link>
                    </div>
                </Reveal>

                {/* Trust Indicators */}
                <div
                    className="flex flex-wrap justify-center items-center gap-8 mt-16 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40"
                >
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
                        <span>Escrow Protected</span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-white/10" />
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500/60" />
                        <span>150+ Jurisdictions</span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-white/10" />
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                        <span>24/7 Intel</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
