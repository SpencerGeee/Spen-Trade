"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Globe, Lock, CreditCard, Fingerprint } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Bank-Grade Escrow",
        description: "Every trade is locked in our smart contract escrow. Funds are only released when both parties confirm. Zero counterparty risk.",
        gradient: "from-amber-500/20 to-yellow-600/5",
        iconColor: "text-amber-500",
        span: "md:col-span-2 md:row-span-1",
    },
    {
        icon: Zap,
        title: "Lightning Settlements",
        description: "Trades complete in minutes with our automated payment matching engine and instant blockchain confirmations.",
        gradient: "from-cyan-500/20 to-blue-600/5",
        iconColor: "text-cyan-500",
        span: "md:col-span-1 md:row-span-1",
    },
    {
        icon: Globe,
        title: "150+ Countries",
        description: "A truly global marketplace supporting 50+ local currencies and region-specific payment methods.",
        gradient: "from-green-500/20 to-emerald-600/5",
        iconColor: "text-green-500",
        span: "md:col-span-1 md:row-span-1",
    },
    {
        icon: Lock,
        title: "Privacy First",
        description: "We respect your sovereignty. No intrusive data collection, no KYC for small trades, just secure peer-to-peer exchange.",
        gradient: "from-violet-500/20 to-purple-600/5",
        iconColor: "text-violet-500",
        span: "md:col-span-1 md:row-span-1",
    },
    {
        icon: CreditCard,
        title: "100+ Payment Methods",
        description: "Bank transfers, gift cards, PayPal, M-Pesa, cash deposit — trade using your preferred method.",
        gradient: "from-rose-500/20 to-pink-600/5",
        iconColor: "text-rose-500",
        span: "md:col-span-1 md:row-span-1",
    },
    {
        icon: Fingerprint,
        title: "KYC Verified Traders",
        description: "Our identity verification system ensures you trade with legitimate, verified counterparties.",
        gradient: "from-blue-500/20 to-indigo-600/5",
        iconColor: "text-blue-500",
        span: "md:col-span-1 md:row-span-1",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
    return (
        <section className="py-28 bg-background relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-medium text-sm uppercase tracking-widest mb-3"
                    >
                        Why SpenTrade
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-3xl md:text-5xl font-bold mb-4"
                    >
                        Built for{" "}
                        <span className="text-gradient-gold">Excellence</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg"
                    >
                        Every feature engineered for traders who demand security, speed, and privacy.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className={`group relative p-8 rounded-2xl glass glow-border transition-all duration-300 ${feature.span}`}
                        >
                            {/* Gradient bg on hover */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-background/50 border border-white/10 mb-5 ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-foreground transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
