"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Alex M.",
        role: "Professional Trader",
        quote: "SpenTrade's escrow system is the best I've used. Completed over 200 trades with zero issues. The interface feels like a premium fintech app.",
        rating: 5,
        avatar: "AM",
    },
    {
        name: "Sarah K.",
        role: "Crypto Investor",
        quote: "The speed of settlements is unmatched. What used to take hours on other platforms happens in minutes here. Plus, their support team is incredible.",
        rating: 5,
        avatar: "SK",
    },
    {
        name: "David R.",
        role: "Business Owner",
        quote: "I handle cross-border payments through SpenTrade. Gift card trading is seamless, and the KYC process was quick and painless.",
        rating: 5,
        avatar: "DR",
    },
    {
        name: "Maria L.",
        role: "Day Trader",
        quote: "The dark mode UI is gorgeous. It's clear the team spent time on design. Functions smoothly on mobile too — I trade on the go every day.",
        rating: 5,
        avatar: "ML",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-28 bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-medium text-sm uppercase tracking-widest mb-3"
                    >
                        Testimonials
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-montserrat text-3xl md:text-5xl font-bold"
                    >
                        Loved by{" "}
                        <span className="text-gradient-gold">Thousands</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="glass rounded-2xl p-8 glow-border group"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-foreground/90 leading-relaxed mb-6 italic">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
