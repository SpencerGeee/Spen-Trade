"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 8,
        filter: "blur(4px)",
    },
    enter: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
            filter: { duration: 0.3 },
        },
    },
    exit: {
        opacity: 0,
        y: -4,
        filter: "blur(2px)",
        transition: {
            duration: 0.25,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [displayKey, setDisplayKey] = useState(pathname);
    const [showOverlay, setShowOverlay] = useState(false);
    const prevPath = useRef(pathname);

    useEffect(() => {
        if (pathname !== prevPath.current) {
            // Show transition overlay
            setShowOverlay(true);

            const timer = setTimeout(() => {
                setDisplayKey(pathname);
                setShowOverlay(false);
                prevPath.current = pathname;
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [pathname]);

    return (
        <div className="relative">
            {/* Transition overlay — sweeping gold line */}
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        key="page-transition-overlay"
                        className="fixed inset-0 z-[9998] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        {/* Horizontal sweep line */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                            initial={{ scaleX: 0, transformOrigin: "left" }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                        />
                        {/* Subtle vignette */}
                        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/30" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Page content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={displayKey}
                    variants={pageVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
