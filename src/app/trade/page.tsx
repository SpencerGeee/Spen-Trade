"use client";

import { TradeWidget } from "@/components/home/trade-widget";
import { Reveal } from "@/components/reveal";
import { Shield, Zap, RefreshCw } from "lucide-react";

export default function TradePage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header Space */}
            <div className="h-24 bg-gradient-to-b from-primary/10 to-transparent" />

            <div className="container max-w-6xl mx-auto px-4">
                <Reveal direction="down" className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Start Trading</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Choose your preferred payment method and asset to find the best offers from trusted traders worldwide.
                    </p>
                </Reveal>

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
                                { icon: Shield, title: "Escrow Protected", desc: "Funds held securely until both parties confirm." },
                                { icon: Zap, title: "Instant Trades", desc: "Average release time is under 5 minutes." },
                                { icon: RefreshCw, title: "24/7 Support", desc: "Our dispute team is always ready to help." },
                            ].map((item, i) => (
                                <Reveal key={i} delay={0.6 + (i * 0.1)} direction="up">
                                    <div className="p-4 rounded-2xl border border-primary/5 bg-secondary/20">
                                        <item.icon className="h-6 w-6 text-primary mb-3" />
                                        <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Guidelines */}
                    <Reveal direction="left" delay={0.4} className="lg:col-span-1 hidden lg:block">
                        <div className="p-8 rounded-3xl border border-primary/20 bg-secondary/10 sticky top-32">
                            <h3 className="text-xl font-serif font-bold mb-6">Trading Guidelines</h3>
                            <ul className="space-y-4">
                                {[
                                    "Never trade outside of SpenTrade escrow.",
                                    "Check trader reputation before starting.",
                                    "Read the specific terms of the offer.",
                                    "Keep all chat communication on-platform.",
                                    "Verify payments before releasing crypto."
                                ].map((text, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                                        <span className="text-primary font-bold">{i + 1}.</span>
                                        {text}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20">
                                <p className="text-xs text-primary font-medium">
                                    Need help? Our luxury concierge is available 24/7 for high-volume traders.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
