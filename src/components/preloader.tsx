"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function Preloader() {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    // Initial load and route change trigger
    useEffect(() => {
        setIsLoading(true);
        setProgress(0);

        // Simulate a fast progress bar
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Accelerate towards the end
                const increment = prev < 60 ? 10 : prev < 85 ? 5 : 2;
                return Math.min(prev + increment, 100);
            });
        }, 20);

        return () => clearInterval(interval);
    }, [pathname]);

    useEffect(() => {
        if (progress === 100) {
            const timeout = setTimeout(() => setIsLoading(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [progress]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                >
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px'
                        }}
                    />

                    {/* Center content */}
                    <div className="relative flex flex-col items-center gap-10">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="font-fauna text-3xl tracking-[0.3em] uppercase text-foreground">
                                Spen<span className="text-primary font-garamond">Trade</span>
                            </div>
                            <div className="text-[9px] font-bold uppercase tracking-[0.5em] text-muted-foreground/40">
                                Institutional Grade
                            </div>
                        </motion.div>

                        {/* Progress bar */}
                        <div className="w-48 relative">
                            <div className="h-[1px] w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1, ease: "linear" }}
                                />
                            </div>
                            {/* Glow effect on tip */}
                            <motion.div
                                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/80 blur-sm"
                                initial={{ left: "0%" }}
                                animate={{ left: `${Math.min(progress, 98)}%` }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            />
                        </div>

                        {/* Percentage */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-[10px] font-mono font-bold tracking-[0.3em] text-muted-foreground/30"
                        >
                            {progress.toFixed(0).padStart(3, '0')}
                        </motion.div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-primary/20" />
                    <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-primary/20" />
                    <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-primary/20" />
                    <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-primary/20" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
