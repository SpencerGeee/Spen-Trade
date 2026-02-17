"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useSpring, useTransform, animate } from "framer-motion";

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
    const count = useSpring(0, {
        duration: 2000,
        bounce: 0,
    });

    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        if (isInView) {
            count.set(target);
        }
    }, [isInView, target, count]);

    useEffect(() => {
        return count.on("change", (latest) => {
            // For the 0.1 case, we need to handle it specifically as Math.floor(0.1) is 0.
            // If the target is 0.1, we want to display "0.1" when the animation is near completion.
            // Otherwise, we floor the value for integer counts.
            let val;
            if (target === 0.1) {
                // If target is 0.1, we want to show 0.1, not 0.
                // We can check if `latest` is close to 0.1 or if the animation is effectively done.
                // For simplicity, let's just display "0.1" if the target is 0.1 and the animation has started.
                val = latest > 0 ? 0.1 : 0; // Display 0.1 once animation starts, otherwise 0
            } else {
                val = Math.floor(latest);
            }

            const formatted = val >= 1000 ? val.toLocaleString() : val.toString();
            setDisplayValue(formatted);
        });
    }, [count, target]); // Added target to dependencies for the 0.1 case

    return (
        <span>
            {prefix}{displayValue}{suffix}
        </span>
    );
}

export default function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 relative overflow-hidden gpu">
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
