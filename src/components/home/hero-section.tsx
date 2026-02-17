"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
                {/* Badge */}
                <div
                    className="inline-flex items-center gap-2 rounded-full border border-primary/20 glass px-4 py-2 text-sm font-medium text-primary mb-8"
                >
                    <Sparkles className="h-4 w-4" />
                    <span>The Future of P2P Trading is Here</span>
                    <span className="flex h-2 w-2 rounded-full bg-green-500" />
                </div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                    className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-foreground mb-6 max-w-5xl leading-[1.1]"
                >
                    Trade Crypto with{" "}
                    <span className="text-gradient-gold">
                        Absolute Confidence
                    </span>
                </motion.h1>

                {/* Subhead */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
                >
                    Experience the most secure, luxurious, and efficient peer-to-peer
                    cryptocurrency marketplace. Escrow protection, instant settlements,
                    and premium support&mdash;all in one platform.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Link href="/register">
                        <Button
                            size="lg"
                            variant="gold"
                            className="w-full sm:w-auto text-base px-10 h-14 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 active:scale-95 gpu"
                        >
                            Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/offers">
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto text-base px-10 h-14 rounded-2xl border-primary/20 hover:bg-primary/5 glass transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <Shield className="mr-2 h-4 w-4" /> Browse Offers
                        </Button>
                    </Link>
                </motion.div>

                {/* Trust Indicators */}
                <div
                    className="flex items-center gap-6 mt-12 text-xs text-muted-foreground"
                >
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span>Escrow Protected</span>
                    </div>
                    <div className="h-4 w-px bg-border" />
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span>150+ Countries</span>
                    </div>
                    <div className="h-4 w-px bg-border" />
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span>24/7 Support</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
