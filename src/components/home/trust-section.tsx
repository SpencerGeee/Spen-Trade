"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Eye, Clock, Headphones, Award, Lock } from "lucide-react";

const badges = [
    { icon: ShieldCheck, label: "Escrow Protected", sub: "Every trade secured" },
    { icon: Eye, label: "KYC Verified", sub: "Identity-checked traders" },
    { icon: Clock, label: "24/7 Trading", sub: "Always-on marketplace" },
    { icon: Headphones, label: "Premium Support", sub: "Real human agents" },
    { icon: Award, label: "Top Rated", sub: "4.9/5 user satisfaction" },
    { icon: Lock, label: "Cold Storage", sub: "Funds stored offline" },
];

const partners = [
    "Ethereum", "Polygon", "Solana", "Chainlink", "Uniswap",
    "MetaMask", "WalletConnect", "Coinbase", "Binance", "Tether",
];

export default function TrustSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container px-4 md:px-6">
                {/* Trust badges */}
                <div className="text-center mb-12">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-medium text-sm uppercase tracking-widest mb-3"
                    >
                        Trusted & Verified
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-montserrat text-3xl md:text-4xl font-bold"
                    >
                        Your Security is Our{" "}
                        <span className="text-gradient-gold">Priority</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                    {badges.map((badge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{ y: -4 }}
                            className="glass rounded-2xl p-5 text-center glow-border group"
                        >
                            <badge.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                            <p className="font-semibold text-sm mb-1">{badge.label}</p>
                            <p className="text-xs text-muted-foreground">{badge.sub}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Partners marquee */}
                <div className="relative overflow-hidden py-4">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    <div className="marquee-track">
                        {[...partners, ...partners].map((partner, index) => (
                            <div
                                key={`${partner}-${index}`}
                                className="shrink-0 px-8 py-3 mx-3 rounded-xl glass text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                            >
                                {partner}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
