"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
    { label: "Active Traders", value: 50000, suffix: "+", prefix: "" },
    { label: "Quarterly Volume", value: 120, suffix: "M", prefix: "$" },
    { label: "Countries", value: 150, suffix: "+", prefix: "" },
    { label: "Dispute Rate", value: 0.1, suffix: "%", prefix: "<" },
];

function AnimatedCounter({ target, prefix, suffix, isInView }: {
    target: number;
    prefix: string;
    suffix: string;
    isInView: boolean;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, target]);

    const formatted = target >= 1000 ? count.toLocaleString() : count === 0.1 ? "0.1" : count.toString();

    return (
        <span>
            {prefix}{formatted}{suffix}
        </span>
    );
}

export function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 relative overflow-hidden">
            {/* Decorative rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/5 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-primary/3 rounded-full pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            className="text-center glass rounded-2xl p-8 glow-border"
                        >
                            <div className="text-4xl md:text-5xl font-bold font-serif text-gradient-gold mb-3">
                                <AnimatedCounter
                                    target={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                    isInView={isInView}
                                />
                            </div>
                            <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
