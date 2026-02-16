"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Quarterly Volume", value: "$120M" },
    { label: "Countries Supported", value: "150+" },
    { label: "Dispute Rate", value: "< 0.1%" },
];

export function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section ref={ref} className="py-20 border-y border-border/50 bg-secondary/10">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="text-4xl md:text-5xl font-bold font-serif text-primary mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
