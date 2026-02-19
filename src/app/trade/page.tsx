"use client";

import TradeWidget from "@/components/home/trade-widget";
import { Reveal } from "@/components/reveal";
import { Shield, Zap, RefreshCw } from "lucide-react";

export default function TradePage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header Space */}
            <div className="h-24 bg-gradient-to-b from-primary/10 to-transparent" />

            <div className="container max-w-6xl mx-auto px-4">
                <div className="space-y-4 mb-16">
                    <Reveal direction="down" delay={0.1}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                            <Zap className="h-3.5 w-3.5" />
                            Execution Hub
                        </div>
                    </Reveal>
                    <Reveal direction="down" delay={0.2} width="100%">
                        <h1 className="text-4xl md:text-7xl font-montserrat font-extrabold tracking-tighter leading-[1.1]">
                            The Art of <br />
                            <span className="text-gradient-gold">Seamless Execution</span>
                        </h1>
                    </Reveal>
                    <Reveal direction="down" delay={0.3}>
                        <p className="text-muted-foreground text-lg font-medium opacity-80 max-w-2xl">
                            Deploy liquidity across elite global channels with instant settlement and institutional security.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Main Widget Area */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            {/* Resetting some widget specific styles for page view if needed */}
                            <div className="[&>div]:mt-0 [&>div]:container-none">
                                <TradeWidget />
                            </div>
                        </div>

                        {/* Trading Info */}
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { icon: Shield, title: "Secure Custody", desc: "Institutional escrow protection protocols." },
                                { icon: Zap, title: "Elite Velocity", desc: "Average release cycles under 300 seconds." },
                                { icon: RefreshCw, title: "Concierge Desk", desc: "Expert dispute resolution available 24/7." },
                            ].map((item, i) => (
                                <Reveal key={i} delay={0.4 + (i * 0.1)} direction="up">
                                    <div className="p-6 rounded-[2rem] border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all duration-300">
                                        <div className="p-2 w-fit rounded-xl bg-primary/10 text-primary mb-4">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-montserrat font-bold text-sm mb-1 uppercase tracking-wider">{item.title}</h3>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 leading-relaxed">{item.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Guidelines */}
                    <Reveal direction="left" delay={0.2} className="lg:col-span-1 hidden lg:block">
                        <div className="p-10 rounded-[2.5rem] border border-white/10 glass shadow-2xl sticky top-32">
                            <h3 className="text-lg font-montserrat font-black mb-8 uppercase tracking-widest border-b border-white/5 pb-4">Safe Conduct</h3>
                            <ul className="space-y-6">
                                {[
                                    "Trade exclusively through SpenTrade escrow.",
                                    "Verify reputation before initiating contract.",
                                    "Review specific institutional terms.",
                                    "Keep communication within secure portal.",
                                    "Confirm settlement before releasing assets."
                                ].map((text, i) => (
                                    <li key={i} className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-relaxed">
                                        <span className="text-primary font-black italic">PRTCL {i + 1}</span>
                                        {text}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20 shadow-inner">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80 leading-relaxed text-center">
                                    High-volume institutional accounts receive dedicated luxury concierge support.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
