"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Globe, Lock, CreditCard, Users } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Bank-Grade Security",
        description: "Your funds are protected by our advanced escrow system and cold storage wallets.",
        className: "md:col-span-2",
    },
    {
        icon: Zap,
        title: "Instant Settlements",
        description: "Trades are completed in minutes with our automated payment matching engine.",
        className: "md:col-span-1",
    },
    {
        icon: Globe,
        title: "Global Marketplace",
        description: "Trade with users from over 150 countries supporting 50+ local currencies.",
        className: "md:col-span-1",
    },
    {
        icon: Lock,
        title: "Private & Anonymous",
        description: "We respect your privacy. No intrusive data collection, just secure trading.",
        className: "md:col-span-2",
    },
];

export function FeaturesSection() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-3xl md:text-5xl font-bold mb-4"
                    >
                        Why Choose SpenTrade?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg"
                    >
                        Built for traders who demand excellence, security, and speed.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`p-8 rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm hover:bg-secondary/40 transition-colors ${feature.className}`}
                        >
                            <feature.icon className="h-10 w-10 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
